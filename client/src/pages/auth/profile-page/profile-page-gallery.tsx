import React, { useRef } from 'react';
import { Box } from '@mui/material';
import Image from 'types/image';
import BlueButton from '../../../components/buttons/blue-button';
import ImageGrid from './profile-page-image-grid';
import ProfileService from '../../../services/profile-service';
import { UpdateImgData, HandleImageDelete } from './profile-page-media-form';

export type ProfilePageGalleryProps = {
  imgData: Image[],
  updateImgData: UpdateImgData,
  handleImageDelete: HandleImageDelete
};

const ProfilePageGallery:
React.FC<ProfilePageGalleryProps> = ({ imgData, updateImgData, handleImageDelete }) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = () => {
    if (fileUploadRef && fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleImagesLoaded = async () => {
    const input = fileUploadRef.current;
    if (input && input.files) {
      const images = await ProfileService.uploadImages(input.files);
      updateImgData(images);
    }
  };

  return (
    <Box sx={{ mt: { xs: 4, lg: 0 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <input
          type="file"
          hidden
          ref={fileUploadRef}
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={handleImagesLoaded}
        />
      </Box>
      <Box sx={{ minWidth: '320px', width: '35vw' }}>
        <ImageGrid imgData={imgData} handleImageDelete={handleImageDelete} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BlueButton
          sx={{
            backgroundColor: 'secondary.main', mt: 2, pt: '2px', pb: '2px', fontSize: '0.7rem', boxShadow: '0px 0px 0px 0px',
          }}
          onClick={handleUploadFiles}
        >
          Upload Media
        </BlueButton>
      </Box>
    </Box>
  );
};

export default ProfilePageGallery;
