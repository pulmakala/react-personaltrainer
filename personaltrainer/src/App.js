import './App.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PeopleIcon from '@material-ui/icons/People';
import SportsIcon from '@material-ui/icons/Sports';
import EventIcon from '@material-ui/icons/Event';

import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar.js';


function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal trainer
          </Typography>
          <Tabs value={value} onChange={handleChange}>
                <Tab value="one" icon={<PeopleIcon/>} label="Customers" />
                <Tab value="two" icon={<SportsIcon/>} label="Trainings" />
                <Tab value="three" icon={<EventIcon/>} label="Calendar" />
              </Tabs>
        </Toolbar>
      </AppBar>
      {value === 'one' && 
      <div>
        <Customerlist />
      </div>}
      {value === 'two' && 
      <div>
        <Trainingslist />
      </div>}
      {value === 'three' && 
      <div>
        <Calendar />
      </div>}
    </div>
  );
}

export default App;