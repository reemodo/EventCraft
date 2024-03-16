import React from "react";
import ReactPlayer from "react-player";// Import your GIF file
export function TopContainer({}) {
  return (
    <>

  {/* Video player */}
  <div className="container">    
  <div style={{ maxWidth:'100%', paddingTop:' 70px',
    textAlign:'center',
    fontSize: '40px'}}>
 
  <ReactPlayer
    url={require("./IconsSource/basicVideo.mp4")}
    playing
    loop
    muted
    width="100%"
    height="100%"
    style={{ position: "", top: 0, left: 0 }}
  />
Precision in Planning,
Excellence in Execution
  </div>

    </div>
    </>
  );
}
