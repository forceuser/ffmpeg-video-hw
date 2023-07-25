import nodePath from "node:path";
import fs from "fs-extra";
import {spawn} from "node:child_process";
import formatDuration from "format-duration";
import process from "node:process";
import ffmpegPath from "ffmpeg-static";

async function sh (...args) {
    return new Promise((resolve, reject) => {
        const child = spawn(...args);
    
        child.stdout.on("data", data => {
            console.log(data.toString("utf8"));
        });
    
        child.stderr.on("data", data => {
            console.log(data.toString("utf8"));
        });
    
        child.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
    
        child.on("close", code => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });
    });
}


async function fixVideo (src, target) {
    await fs.ensureDir(nodePath.dirname(target));

    await sh(ffmpegPath, [
        "-i",
        src,
        // "-map_metadata", "-1",
        // "-metadata", "alpha_mode=\"0\"",
        "-pix_fmt", "yuv420p",
        "-c",
        "copy",
        "-fflags",        
        "+genpts",
        "-y",
        target,
    ]);
}

async function encodeVideo (src, target, {hardware = false} = {}) {
    await fs.ensureDir(nodePath.dirname(target));
    
    
    let inputArgs;
    let preArgs = [];
    if (Array.isArray(src)) {
        const concatList = src.map(file => `file '${file}'`).join("\n");
        const listFile = target + ".list";
        await fs.writeFile(listFile, concatList, "utf8");

        inputArgs = [
            "-f", "concat",
            "-safe", "0",
            "-i", target + ".list",
        ];
    }
    else {
        inputArgs = [
            "-i", src,
        ];
    }
    let videoCodecArgs = [];
    if (hardware === "cuda") {
        preArgs = [
            "-hwaccel", "nvdec",
            // "-hwaccel_device", 0,
            // "-hwaccel_output_format", "cuda",
        ];
        videoCodecArgs = [            
            "-c:v", "h264_nvenc",
            "-rc:v", "vbr",
            "-cq:v", "28",
            "-preset:v", "fast",
            "-tune:v", "hq",
            "-profile:v", "main",
            "-threads", 8,
            // "-level:v", "4.0",
            // "-vf", "scale=3686:1512,setsar=1:1"
        ];
    }
    else if (hardware === "vaapi") {
        preArgs = [
            "-hwaccel", "vaapi",
            // "-hwaccel_device", 0,
            "-hwaccel_output_format", "vaapi",
        ];
        videoCodecArgs = [
            "-c:v", "h264_vaapi",
        ];
    }
    else if (hardware === "videotoolbox") {
        videoCodecArgs = [
            "-c:v", "h264_videotoolbox",
            "-crf", 28,
            "-threads", 8,
            "-maxrate", "20M",
            "-bufsize", "25M",
            "-preset:v", "veryfast",
            "-tune:v", "fastdecode",
            "-profile:v", "main",
            "-level:v", "4.0",
            // "-color_primaries", "bt709",
            // "-color_trc", "bt709",
            // "-colorspace", "bt709",
        ];
    }
    else if (hardware === "qsv") {
        videoCodecArgs = [
            // "-framerate", "30",
            "-c:v", "h264_qsv",
            "-crf", 28,
            "-preset:v", "veryfast",
            "-tune:v", "fastdecode",
            "-profile:v", "main",        
            "-global_quality:v", 28,
            "-look_ahead:v", 1,
            "-look_ahead_depth:v", 20,
            "-look_ahead_downsampling:v", 3,
            "-threads", 8,
            "-async_depth", 8,
        ];
    }
    

    await sh(ffmpegPath, [
        ...preArgs,
        ...inputArgs,
        // "-f", "mp4",            
        "-pix_fmt", "yuv420p",  
        // "-pix_fmt", "nv12",
        "-c:a", "aac",
        "-q:a", "1.68",
        // "-strict", "experimental",
        // "-vf", "hwupload_cuda,scale=w=1280:h=-2",
        ...videoCodecArgs,
        // "-threads", 8, 
        
        "-vf", "format=yuv420p,fps=25,scale=w=1280:h=1280:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2,pad=1280:1280:trunc((ow-iw)/2):trunc((oh-ih)/2)",
        "-af", "aresample=async=1",
        "-movflags", "+faststart",
        "-map_metadata", -1,
        "-write_tmcd", 0,
        "-ignore_editlist", 1,
        "-fflags", "+igndts",        
        // "-fps_mode", "vfr",
        "-vsync", "vfr",
        "-y",
        target,
    ]);
}


async function listCodecs (codec) {
    if (codec) {
        return await sh(ffmpegPath, [
            "-h", `encoder=${codec}`,
        ]);
    }
    await sh(ffmpegPath, [
        "-codecs",
    ]);
}

async function main () {
    const argv =  process.argv.slice(2);

    if (argv.includes("--codecs")) {
        return listCodecs();
    }

    if (argv.includes("--codec")) {
        return listCodecs(argv?.[argv.indexOf("--codec") + 1]);
    }



    const targetDir = nodePath.resolve("../target");
    const srcDir = nodePath.resolve("../src");
    
    const hwArg = argv.indexOf("--hardware");
    const hardware = hwArg !== -1 ? argv[hwArg + 1] : false;
    console.log("Hardware: ", hardware);
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    const startTime = performance.now();
    let src = [
        // "ex_1_0.webm",
        // "ex_1_1.webm",
        "example.webm",
    ];
    let videos = [];
    await src.reduce(async (prev, src) => {
        await prev;
        const fixedName = (name) => [...name.split(".").slice(0, -1), "fixed", hardware, name.split(".").slice(-1)[0]].join(".");
        const targetFixed = nodePath.resolve(targetDir, fixedName(src));        
        await fixVideo(nodePath.resolve(srcDir, src), targetFixed);   
        videos.push(targetFixed);
    }, null);
    
    await encodeVideo(videos, videos[0] + ".mp4", {hardware});
    const endTime = performance.now();
    
    console.log("Time taken: ", formatDuration(endTime - startTime))
}


main();