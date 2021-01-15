import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Moment from "moment";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        getTrainings();
    }, [])

    //Snackbar open
    const handleOpen = () => {
        setOpen(true);
    }

    //Snackbar close
    const handleClose  = () => {
        setOpen(false);
    }

    //Get trainings from back end REST api
    const getTrainings= () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(response => response.json())
          .then((data) => setTrainings(data))
          .catch(err => console.error(err));
    };

    //Delete training
    const deleteTraining = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
            method: 'DELETE'
            })
            .then((_) => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

     //Lets create columns that match REST api
     const columns = [
        {headerName: 'Date', field: 'date', cellRenderer: (data) => { 
        return Moment(data.value).format("DD.MM.YYYY HH:mm");
        }, sortable: true, filter: true},
        {headerName: 'Duration',field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'First name', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'customer.lastname', sortable: true, filter: true},        
        {
          headerName: '',
          field: 'data',
          width: 90,
          cellRendererFramework: params => 
          <IconButton color="secondary" onClick={() => deleteTraining(params.data.id)}>
              <DeleteIcon fontSize="small" />
          </IconButton>
        }
    ]

    return (
        <div>
          <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto' }}>
          <h2>Trainings</h2>  
          <AgGridReact

              ref={gridRef}
              suppressCellSelection={true}
              onGridReady={(params) => {
                gridRef.current = params.api;
              }}

              rowData={trainings}
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
            message="Training deleted succesfully"
          />
        </div>
    );
        
}

export default Trainingslist;