import React from "react";
import { useEffect, useState } from "react";
import NutritionTable from "./components/nutritionTable";
import { db, db_n } from "../../config/firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// import { getDocs, collection, where, query } from "firebase/firestore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/joy";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "./components/pieChart";
import PieChartNutrition from "./components/pieChartNutrition";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const nutrition_collection = collection(db, "nutrition");

function clear_box() {
  document.getElementById("meal").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("fat").value = "";
  document.getElementById("carbs").value = "";
  document.getElementById("protein").value = "";
}
function save() {
  var meal_doc = document.getElementById("meal").value;
  var calories_doc = document.getElementById("calories").value;
  var fat_doc = document.getElementById("fat").value;
  var carbs_doc = document.getElementById("carbs").value;
  var protein_doc = document.getElementById("protein").value;

  setDoc(doc(nutrition_collection), {
    meal: meal_doc,
    calories: calories_doc,
    fat: fat_doc,
    carbs: carbs_doc,
    protein: protein_doc,
  });
  clear_box();
  alert("Added Meal");
}

function NutritionHome() {
  const [data, setData] = useState([
    { name: "Fat", value: 0, fill: "#8884d8" },
    { name: "Carbohydrate", value: 0, fill: "#82ca9d" },
    { name: "Protein", value: 0, fill: "#ffc658" },
  ]);

  dayjs.extend(utc);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
      <Grid container spacing={0} sx={{ flexGrow: 1 }} alignItems="center">
        <Grid xs={8}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="meal" label="Meal" multiline maxRows={4} />
            <TextField
              id="calories"
              label="Calories"
              multiline
              maxRows={4}
              defaultValue={""}
            />
            <TextField
              id="fat"
              label="Fat (g)"
              multiline
              maxRows={4}
              defaultValue={""}
            />
            <TextField
              id="carbs"
              label="Carbs (g)"
              multiline
              maxRows={4}
              defaultValue={""}
            />
            <TextField
              id="protein"
              label="Protein (g)"
              multiline
              maxRows={4}
              defaultValue={""}
            />
          </Box>
        </Grid>
        <Grid xs={4}>
          <Button variant="contained" onClick={save}>
            Add Meal
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid xs={6}>
          <PieChartNutrition pieData={data} />
        </Grid>
        <Grid xs={6}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </Grid>
      </Grid>
      <NutritionTable
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setPieData={setData}
        pieData={data}
      />
    </>
  );
}

export default NutritionHome;
