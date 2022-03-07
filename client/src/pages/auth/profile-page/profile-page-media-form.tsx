import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'types/image';
import Gallery from './profile-page-gallery';
import { userSelector } from '../../../store/auth';
import ProfileService from '../../../services/profile-service';

export type HandleImageDelete = (id: string) => Promise<void>;
export type UpdateImgData = (data: Image[]) => void;

const ProfilePageMediaForm: React.FC = () => {
  const user = useSelector(userSelector);
  const [imgData, setImgData] = useState<Image[]>([]);

  const updateImgData: UpdateImgData = (newImgData) => {
    console.log(newImgData);
    setImgData([...imgData, ...newImgData]);
  };

  const handleImageDelete: HandleImageDelete = async (id) => {
    await ProfileService.deleteImage(id);
    setImgData(imgData.filter((x) => x.id !== id));
  };

  useEffect(() => {
    (async () => {
      const fetchedImgData = await ProfileService.getUserImages();
      setImgData(fetchedImgData);
    })();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <Gallery
            imgData={imgData}
            updateImgData={updateImgData}
            handleImageDelete={handleImageDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePageMediaForm;
