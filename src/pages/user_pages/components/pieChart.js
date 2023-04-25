import React, { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**********************************

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
});

function PieChartComponent() {
  const classes = useStyles();
  const [data, setData] = useState([
    { name: 'Proteins', value: 0 },
    { name: 'Sugars', value: 0 },
    { name: 'Carbohydrate', value: 0 },
    { name: 'Fat', value: 0 },
    { name: 'Salt', value: 0 },
  ]);
  const [groupAValue, setGroupAValue] = useState(data[0].value);
  const [groupBValue, setGroupBValue] = useState(data[1].value);
  const [groupCValue, setGroupCValue] = useState(data[2].value);
  const [groupDValue, setGroupDValue] = useState(data[3].value);
  const [groupFValue, setGroupFValue] = useState(data[3].value);

  const handleGroupAChange = (event) => {
    setGroupAValue(event.target.value);
  };
  const handleGroupBChange = (event) => {
    setGroupBValue(event.target.value);
  };
  const handleGroupCChange = (event) => {
    setGroupCValue(event.target.value);
  };
  const handleGroupDChange = (event) => {
    setGroupDValue(event.target.value);
  };
  const handleGroupFChange = (event) => {
    setGroupFValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData([
      { name: 'Proteins', value: Number(groupAValue), fill: '#8884d8' },
      { name: 'Sugars', value: Number(groupBValue), fill: '#82ca9d' },
      { name: 'Carbohydrate', value: Number(groupCValue), fill: '#ffc658' },
      { name: 'Fat', value: Number(groupDValue), fill: '#ff7f50' },
      { name: 'Salt', value: Number(groupDValue), fill: '#fc6660' },
    ]);
  };

  return (
    <div className={classes.chartContainer}>
      <Typography variant="h4">Nutrition Daily Summary</Typography>
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
      <form onSubmit={handleFormSubmit} className={classes.formContainer}>
        <TextField
          label="Proteins"
          variant="outlined"
          type="number"
          value={groupAValue}
          onChange={handleGroupAChange}
          margin="normal"
        />
        <TextField
          label="Sugars"
          variant="outlined"
          type="number"
          value={groupBValue}
          onChange={handleGroupBChange}
          margin="normal"
        />
        <TextField
          label="Carbohydrate"
          variant="outlined"
          type="number"
          value={groupCValue}
          onChange={handleGroupCChange}
          margin="normal"
        />
         <TextField
          label="Fat"
          variant="outlined"
          type="number"
          value={groupDValue}
          onChange={handleGroupDChange}
          margin="normal"
        />
        <TextField
          label="Salt"
          variant="outlined"
          type="number"
          value={groupFValue}
          onChange={handleGroupFChange}
          margin="normal"
        />
        <button type="submit">Update Data</button>
      </form>
    </div>
  );
}

export default PieChartComponent;