import React from 'react';
import BackgroundVideo from './assets/background-video.mp4';

const HomePageBackgroundVideo = () => (
  <video
    loop
    autoPlay
    muted
    style={{
      position: 'absolute',
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      top: 0,
      right: 0,
      left: 0,
      overflow: 'hidden',
      filter: 'brightness(40%)',
      zIndex: '-1',
    }}
  >
    <source src={BackgroundVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default HomePageBackgroundVideo;
