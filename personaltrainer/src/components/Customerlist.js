import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Trainingslist from "./Trainingslist";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
        getCustomers();
    }, [])

    //Snackbar open
    const handleOpen = () => {
        setOpen(true);
    }

    //Snackbar close
    const handleClose  = () => {
        setOpen(false);
    }

    //Fetch data
    const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  }

    //Get customers from back end REST api
    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    //Delete customer
    const deleteCustomer = (link) => {
      if (window.confirm("Are you sure?")) {
        fetch(link[0].href, { 
          method: "DELETE" 
        })
        .then(_ => getCustomers())
        .then(_ => handleOpen())
        .catch(err => console.error(err))
      }
    }

    //Add a new customer
    const addCustomer = (customer) => {
      fetch("https://customerrest.herokuapp.com/api/customers", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(customer),
      })
        .then(response => getCustomers())
        .catch(err => console.error(err));
    };

    //Edit customer
    const updateCustomer = (customer, link) => {
      fetch(link, { 
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(customer)
      })
      .then(res => fetchData()) 
      .catch(err => console.error(err))
    }

    const addTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(training)
      })
      .then(res => fetchData())
      .catch(err => console.log(err))
    }

    //Lets create columns that match REST api
    const columns = [
        {
          headerName: 'Add training',
          width: '140',
          cellRendererFramework: (params) => <AddTraining addTraining={addTraining} params={params} />
        },
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true, width: 140},
        {headerName: 'Last name',field: 'lastname', sortable: true, filter: true, width: 150},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Post code', field: 'postcode', sortable: true, filter: true, width: 150},
        {headerName: 'City', field: 'city', sortable: true, filter: true, width: 150},
        {headerName: 'E-mail', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true, width: 150},
        {
          headerName: '',
          accessor: 'content.self.href',
          width: 90,
          cellRendererFramework: (params) => 
          <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        },
        {
          headerName: '',
          field: "links",
          width: 90,
          cellRendererFramework: (params) => (
          <IconButton 
            color="secondary" 
            onClick={() => deleteCustomer(params.value)}
            >
              <DeleteIcon fontSize="small" />
          </IconButton>
          )
        }
    ]

    return (
    <div>
      <div className="ag-theme-material" style={{  height: 600, width: '90%', margin: 'auto' }}>
      <div>
        <AddCustomer addCustomer={addCustomer} />
      </div>
        <AgGridReact
            
          rowData={customers}
          columnDefs={columns}
          pagination="true"
          paginationPageSize="10"
        >
        </AgGridReact>
      </div>
      <Snackbar 
        open={open}
        onClose={handleClose}
        autoHideDuration={2500}
        message="Customer deleted succesfully"
      />
    </div>
  );
}

export default Customerlist;