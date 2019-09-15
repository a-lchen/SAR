import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.clueOpen}
          onClose={() => {}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Report A Clue</DialogTitle>
          <DialogContent>
            <DialogContentText>Thanks for submitting a clue!</DialogContentText>
            <TextField
              onChange={e => {
                this.setState({
                  text: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Details"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClueCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.props.onSendClue(this.state.text);
              }}
              color="primary"
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
