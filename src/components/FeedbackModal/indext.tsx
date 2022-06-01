import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { IFeedbackList } from '../../interfaces/IFeedbackList';

const emails = ['username@gmail.com', 'user02@gmail.com'];


export interface FeedbackProps {
  open: boolean;
  onClose: () => void;
  data: IFeedbackList;
}

export default function FeedbackModal(props: FeedbackProps) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <TextField
            sx={{mt: 1, mb: 1}}
            id="name-textarea"
            label="Name"
            disabled 
            fullWidth
            value={data.esg_name}
         />
         <TextField
            sx={{mt: 1, mb: 1}}
            id="email-textarea"
            label="E-mail"
            disabled 
            fullWidth
            value={data.email}
         />
        <TextField
            sx={{mt: 1, mb: 1}}
            id="esg-textarea"
            label="ESG"
            disabled 
            fullWidth
            value={data.esg_name}
         />
         <TextField
            sx={{mt: 1, mb: 1}}
            id="subject-textarea"
            label="Subject"
            disabled 
            fullWidth
            value={data.subject_name}
         />
         <TextField
            sx={{mt: 1, mb: 1}}
            id="description-textarea"
            label="Description"
            disabled 
            fullWidth
            multiline
            minRows={4}
            value={data.description}
         />
      
      </DialogContent>
    </Dialog>
  );
}