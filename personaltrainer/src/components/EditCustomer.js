import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropertyKeys } from 'ag-grid-community';

function EditCustomer(props) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);
  
  //Snackbar open
  const handleClickOpen = () => {
    setCustomer({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone
    })
    setOpen(true);
    console.log(props.customer);
  };
  
  //Snackbar close
  const handleClose = () => {
    setOpen(false);
  };

  //Save information
  const handleUpdate = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
    handleClose();  
  };

  const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value});
  };

  return (
      <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Customer Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="firstname"
              label="First name"
              value={customer.firstname}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Last name"
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Street address"
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Postcode"
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="City"
              name="city"
              value={customer.city}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={customer.email}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}

export default EditCustomer;