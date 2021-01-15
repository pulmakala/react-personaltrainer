import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropertyKeys } from 'ag-grid-community';

function AddTraining(props) {
    const [training, setTraining] = useState({
      date: '',
      duration: '',
      activity: '',
    });
    const [open, setOpen] = useState(false);

    //Snackbar open
    const handleClickOpen = () => {
      setOpen(true);
    };

    //Snackbar close
    const handleClose = () => {
      setOpen(false);
    };
    
    //Save
    const handleSave = () => {
      const newTraining = {
          ...training,
          date: new Date(training.date),
          customer: props.params.data.links[0].href,
      };
      props.addTraining(newTraining);
      handleClose();
    };

    const inputChanged = (event) => {
      setTraining({ ...training, [event.target.name]: event.target.value });
    };

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            +
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Add a New Training</DialogTitle>
            <DialogContent>
              <TextField
              margin="dense"
              name="date"
              value={training.date}
              onChange={inputChanged}
              label="Date as MM.DD.YYYY HH:mm"
              fullWidth
            />
            <TextField
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={inputChanged}
              label="Duration as minutes"
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={inputChanged}
              label="Activity"
              fullWidth
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

export default AddTraining;