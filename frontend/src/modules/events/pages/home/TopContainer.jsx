import React from "react";
import ReactPlayer from "react-player";// Import your GIF file
export function TopContainer({}) {
  return (
    <>

  {/* Video player */}
  <div className="container">    
  <div style={{ maxWidth:'75%', paddingTop:' 20px',
    textAlign:'center',
    fontSize: '2em',          fontFamily: "Quintessential"}}>
 
  <ReactPlayer
    url={require("./IconsSource/basicVideo.mp4")}
    playing
    loop
    muted
    width="100%"
    height="100%"
    style={{ position: "", top: 0, left: 0 }}
  />
 Crafting and managing memorable events with precision and creativity
  </div>

    </div>
    </>
  );
}
