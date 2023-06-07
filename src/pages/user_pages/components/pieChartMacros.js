import React, { useState } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const PREFIX = "PieChartNutrition";

const classes = {
  chartContainer: `${PREFIX}-chartContainer`,
  formContainer: `${PREFIX}-formContainer`,
};

const Root = styled("div")({
  [`&.${classes.chartContainer}`]: {
    height: "500px",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "column",
  },
  [`& .${classes.formContainer}`]: {
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
  return (
    <Root className={classes.chartContainer}>
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
    </Root>
  );
}

export default PieChartNutrition;
