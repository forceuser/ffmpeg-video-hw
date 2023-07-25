 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_qsv h264_cuvid ) (encoders: libx264 libx264rgb h264_amf h264_nvenc h264_qsv )
 D.VIL. hap                  Vidvox Hap
 DEV.L. hevc                 H.265 / HEVC (High Efficiency Video Coding) (decoders: hevc hevc_qsv hevc_cuvid ) (encoders: libx265 hevc_amf hevc_nvenc hevc_qsv )




 Encoder h264_qsv [H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (Intel Quick Sync Video acceleration)]:
    General capabilities: delay hybrid
    Threading capabilities: none
    Supported hardware devices: qsv qsv qsv
    Supported pixel formats: nv12 p010le qsv
h264_qsv encoder AVOptions:
  -async_depth       <int>        E..V....... Maximum processing parallelism (from 1 to INT_MAX) (default 4)
  -avbr_accuracy     <int>        E..V....... Accuracy of the AVBR ratecontrol (unit of tenth of percent) (from 1 to 65535) (default 1)
  -avbr_convergence  <int>        E..V....... Convergence of the AVBR ratecontrol (unit of 100 frames) (from 1 to 65535) (default 1)
  -preset            <int>        E..V....... (from 1 to 7) (default medium)
     veryfast        7            E..V.......
     faster          6            E..V.......
     fast            5            E..V.......
     medium          4            E..V.......
     slow            3            E..V.......
     slower          2            E..V.......
     veryslow        1            E..V.......
  -rdo               <int>        E..V....... Enable rate distortion optimization (from -1 to 1) (default -1)
  -max_frame_size    <int>        E..V....... Maximum encoded frame size in bytes (from -1 to 65535) (default -1)
  -max_slice_size    <int>        E..V....... Maximum encoded slice size in bytes (from -1 to 65535) (default -1)
  -bitrate_limit     <int>        E..V....... Toggle bitrate limitations (from -1 to 1) (default -1)
  -mbbrc             <int>        E..V....... MB level bitrate control (from -1 to 1) (default -1)
  -extbrc            <int>        E..V....... Extended bitrate control (from -1 to 1) (default -1)
  -adaptive_i        <int>        E..V....... Adaptive I-frame placement (from -1 to 1) (default -1)
  -adaptive_b        <int>        E..V....... Adaptive B-frame placement (from -1 to 1) (default -1)
  -b_strategy        <int>        E..V....... Strategy to choose between I/P/B-frames (from -1 to 1) (default -1)
  -forced_idr        <boolean>    E..V....... Forcing I frames as IDR frames (default false)
  -low_power         <boolean>    E..V....... enable low power mode(experimental: many limitations by mfx version, BRC modes, etc.) (default auto)
  -cavlc             <boolean>    E..V....... Enable CAVLC (default false)
  -vcm               <boolean>    E..V....... Use the video conferencing mode ratecontrol (default false)
  -idr_interval      <int>        E..V....... Distance (in I-frames) between IDR frames (from 0 to INT_MAX) (default 0)       
  -pic_timing_sei    <boolean>    E..V....... Insert picture timing SEI with pic_struct_syntax element (default true)
  -single_sei_nal_unit <int>        E..V....... Put all the SEI messages into one NALU (from -1 to 1) (default -1)
  -max_dec_frame_buffering <int>        E..V....... Maximum number of frames buffered in the DPB (from 0 to 65535) (default 0)
  -look_ahead        <boolean>    E..V....... Use VBR algorithm with look ahead (default false)
  -look_ahead_depth  <int>        E..V....... Depth of look ahead in number frames (from 0 to 100) (default 0)
  -look_ahead_downsampling <int>        E..V....... Downscaling factor for the frames saved for the lookahead analysis (from 0 to 3) (default unknown)
     unknown         0            E..V.......
     auto            0            E..V.......
     off             1            E..V.......
     2x              2            E..V.......
     4x              3            E..V.......
  -int_ref_type      <int>        E..V....... Intra refresh type (from -1 to 65535) (default -1)
     none            0            E..V.......
     vertical        1            E..V.......
  -int_ref_cycle_size <int>        E..V....... Number of frames in the intra refresh cycle (from -1 to 65535) (default -1)    
  -int_ref_qp_delta  <int>        E..V....... QP difference for the refresh MBs (from -32768 to 32767) (default -32768)       
  -recovery_point_sei <int>        E..V....... Insert recovery point SEI messages (from -1 to 1) (default -1)
  -profile           <int>        E..V....... (from 0 to INT_MAX) (default unknown)
     unknown         0            E..V.......
     baseline        66           E..V.......
     main            77           E..V.......
     high            100          E..V.......
  -a53cc             <boolean>    E..V....... Use A53 Closed Captions (if available) (default true)
  -aud               <boolean>    E..V....... Insert the Access Unit Delimiter NAL (default false)
  -repeat_pps        <boolean>    E..V....... repeat pps for every frame (default false)


  libavformat    59. 16.100 / 59. 16.100
  libavdevice    59.  4.100 / 59.  4.100
  libavfilter     8. 24.100 /  8. 24.100
  libswscale      6.  4.100 /  6.  4.100
  libswresample   4.  3.100 /  4.  3.100
  libpostproc    56.  3.100 / 56.  3.100