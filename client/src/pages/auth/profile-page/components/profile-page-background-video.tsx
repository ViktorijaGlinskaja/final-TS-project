import React from 'react';
import BackgroundVideo from '../../../../components/partials/home-page-background-video/assets/background-video.mp4';

const ProfilePageBackgroundVideo: React.FC = () => (
  <video
    loop
    autoPlay
    muted
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: 300,
      objectFit: 'cover',
      overflow: 'hidden',
      filter: 'brightness(30%)',
    }}
  >
    <source src={BackgroundVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default ProfilePageBackgroundVideo;
