import React, { useState } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**********************************

Please read beforehand

please download @material-ui/core

by using 

npm install @material-ui/core --force
npm install @material-ui/styles --force
npm install recharts

In ordder to, run this!!!!

*************************************/

const useStyles = makeStyles({
  chartContainer: {
    height: "500px",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "column",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginLeft: "70%", // adjust the percentage value to move the container to a certain point
    transform: "translateX(-50%)", // horizontally center the container relative to its parent element
    marginTop: "-400px", // adjust the pixel value to move the container upward
    transform: "translateX(-50%)",
  },
});

function PieChartNutrition({ pieData }) {
  const classes = useStyles();
  return (
    <div className={classes.chartContainer}>
      <Typography variant="h4">Nutrition Summary</Typography>
      <PieChart width={800} height={400}>
        <Pie
          data={pieData}
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
    </div>
  );
}

export default PieChartNutrition;
