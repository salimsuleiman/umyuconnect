import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ props }) {
  const { text, dialog, setDialog, HandlePostEdit, postID } = props;
  const [edittext, setText] = useState(text);

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <div>
      <Dialog open={dialog} onClose={handleOpenDialog}>
        <DialogTitle>post update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you made mistake To edit your post please click on save
          </DialogContentText>
          <TextField
            value={edittext}
            onInput={(e) => setText(e.target.value)}
            margin="dense"
            id="name"
            label=""
            type="text"
            variant="standard"
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            disabled={edittext == "" ? "disabled" : ""}
            style={{ backgroundColor: edittext == "" ? "#999" : "#fff" }}
            onClick={() => {
              setDialog(true);
              HandlePostEdit(postID, edittext);
            }}
          >
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
