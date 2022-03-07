import React, { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export type ProfilePageAlertProps = {
  open: boolean,
  handleClose?: () => void,
};

const ProfilePageAlert: React.FC<ProfilePageAlertProps> = ({ open, handleClose }) => {
  const Alert = forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref,
  ) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert onClose={handleClose} severity="success" color="info" sx={{ margin: 'auto', mb: 2, width: { xs: '340px', md: 'auto' } }}>
        Saved successfully!
      </Alert>
    </Snackbar>
  );
};

export default ProfilePageAlert;
