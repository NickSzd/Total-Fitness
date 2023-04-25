import React, { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/************************************

Please read beforehand

please download @material-ui/core

by using 

npm install @material-ui/core --force
npm install @material-ui/core/styles --force
npm install recharts

In ordder to, run this!!!!

*************************************/


const useStyles = makeStyles({
  chartContainer: {
    height: '500px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    flexDirection: 'column',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: '70%', // adjust the percentage value to move the container to a certain point
    transform: 'translateX(-50%)', // horizontally center the container relative to its parent element
    marginTop: '-400px', // adjust the pixel value to move the container upward
    transform: 'translateX(-50%)',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: '50px',
    left: '400px',
  },
});

function PieCaloriesComponent() {
    const classes = useStyles();
    const [data, setData] = useState([
      { name: 'Input Value', value: 0 },
      { name: 'Remaining Value', value: 2500 },
    ]);
    const [inputValue, setInputValue] = useState(0);
  
    const handleInputChange = (event) => {
      const newInputValue = Number(event.target.value);
      setInputValue(newInputValue);
      setData([
        { name: 'Input Value', value: newInputValue },
        { name: 'Remaining Value', value: 2500 - newInputValue },
      ]);
    };
  
    const handleUpdateData = (event) => {
      event.preventDefault();
      setData([
        { name: 'Input Value', value: inputValue, fill: '#8884d8' },
        { name: 'Remaining Value', value: 2500 - inputValue, fill: '#82ca9d' },
      ]);
    };
  
  return (
    <div className={classes.chartContainer}>
      <Typography variant="h4">Calories-Intake Daily Goal</Typography>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
      <form onSubmit={handleUpdateData} className={classes.formContainer}>
        <TextField
          label="Calories"
          variant="outlined"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Data
        </Button>
      </form>
      <div className={classes.dataContainer}>
        <div>
            <Typography variant="h6">Input Value:</Typography>
            <Typography variant="h6" color="primary">
            {inputValue}
            </Typography>
        </div>
        <div>
            <Typography variant="h6">Remaining Value:</Typography>
            <Typography variant="h6" color="secondary">
            {2500 - inputValue}
            </Typography>
        </div>
      </div>
    </div>
  );
}

export default PieCaloriesComponent;