/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  myComponent: {
    position: 'fixed',
    bottom: '10vh',
    display: 'flex',
    width: '100vw',
    justifyContent: 'space-evenly',
    '& .MuiIconButton-root': {
      backgroundColor: '#fff',
      boxShadow: '0px 10px 53px 0px rgba(0, 0, 0, .3) !important',
    },
  },
});

export type SwipeButtonsProps = {
  swipe: (dir: any) => void,
  goBack: () => void
};

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ swipe, goBack }) => {
  const classes = useStyles();
  return (
    <div className={classes.myComponent}>
      <IconButton
        sx={{
          padding: '1vw !important',
          color: '#ec5e6f !important',
        }}
        onClick={() => swipe('left')}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton
        sx={{
          padding: '1vw !important',
          color: '#f5b748 !important',
        }}
        onClick={() => goBack()}
      >
        <ReplyIcon fontSize="large" />
      </IconButton>
      <IconButton
        sx={{
          padding: '1vw !important',
          color: '#76e2b3 !important',
        }}
        onClick={() => swipe('right')}
      >
        <StarIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
