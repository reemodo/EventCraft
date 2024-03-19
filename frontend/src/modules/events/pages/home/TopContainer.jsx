import React from "react";
import ReactPlayer from "react-player";// Import your GIF file
export function TopContainer({}) {
  return (
    <>

  {/* Video player */}
  <div className="container component">    
  <div style={{ maxWidth:'100%',maxHeight:'100%',
    textAlign:'center',
    fontSize: '3vw',          fontFamily: "Quintessential"}}>
 
  <ReactPlayer
    url={require("./IconsSource/basicVideo.mp4")}
    playing
    loop
    muted
    width="100%"
    height="100%"
    style={{ position: "", top: 0, left: 0 }}
  />
  </div>

    </div>
    </>
  );
}
