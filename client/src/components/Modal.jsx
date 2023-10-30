import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

const Modal = () => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to Delete ?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              handleDelete(item._id);
              setOpen(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
