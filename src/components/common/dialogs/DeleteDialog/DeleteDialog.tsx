import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteDialogProps {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleAgree: () => void;
}

export function DeleteDialog({
  title,
  content,
  open,
  handleClose,
  handleAgree,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Disagree
        </Button>
        <Button variant="contained" onClick={handleAgree} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
