/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

const Modal = ({ confirmMessage, onConfirm, isOpen, handleClose }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          backgroundColor: "#35343400",
        }}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>{confirmMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={onConfirm}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
