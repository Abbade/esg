import { Context } from '../../context/AuthContext';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Response() {
  const { abrirResp, msgResp, tipoResp, handleCloseResp } = React.useContext(Context);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseResp();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar  open={abrirResp} autoHideDuration={6000} onClose={handleCloseResp}>
          <Alert onClose={handleCloseResp} severity={tipoResp}>
            {msgResp}
          </Alert>
        </Snackbar>   
    </Stack>
  );
}