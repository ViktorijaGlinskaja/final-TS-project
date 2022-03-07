import React from 'react';
import {
  Box, Fab, SxProps, Theme, styled,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'types/image';
import { HandleImageDelete } from './profile-page-media-form';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  top: 6,
  right: 6,
  height: 16,
  minHeight: 16,
  width: 16,
  borderRadius: '4px',
  backgroundColor: theme.palette.transparentDark.main,
  color: theme.palette.primary.main,
  '&: hover': {
    color: theme.palette.secondary.main,
  },
}));

const imageContainerStyle: SxProps<Theme> = (theme) => ({
  position: 'relative',
  width: '100%',
  pt: '100%',
  '&.selectable': {
    ':hover': {
      cursor: 'pointer',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
});

const HtmlImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export type ProfilePageImageGridProps = ({
  imgData: Image[],
  columns?: number,
  handleImageDelete?: HandleImageDelete,
});

const ProfilePageImageGrid: React.FC<ProfilePageImageGridProps> = ({
  imgData,
  columns,
  handleImageDelete,
}) => (
  <Box sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`,
    width: { xs: '100%', sm: 'auto' },
    flexGrow: 1,
  }}
  >
    {
      imgData.map(({ id, src }) => (
        <Box
          key={id}
          sx={imageContainerStyle}
        >
          <HtmlImage
            src={src}
            alt={src}
          />
          {handleImageDelete && (
            <StyledFab
              size="small"
              onClick={() => handleImageDelete(id)}
            >
              <ClearIcon fontSize="small" />
            </StyledFab>
          )}
        </Box>
      ))
    }
  </Box>
);

export default ProfilePageImageGrid;
