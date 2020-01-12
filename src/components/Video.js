import React from "react";
import { useMediaQuery } from "react-responsive";

const Video = () => {
  // Don't show the video on mobile devices to save data
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 768px)" });

  return (
    isBigScreen && (
      <video id="video" poster="/bg0.jpg" autoPlay muted loop>
        <source src="/bg.mp4" type="video/mp4" />
      </video>
    )
  );
};

export default Video;
