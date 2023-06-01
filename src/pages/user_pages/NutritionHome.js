import React from "react";
import { useEffect, useState } from "react";
import NutritionTable from "./components/nutritionTable";
import { auth, db, db_n } from "../../config/firebase";
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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/joy";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import PieChartNutrition from "./components/pieChartMacros";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";


function clear_box() {
  document.getElementById("meal").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("fat").value = "";
  document.getElementById("carbs").value = "";
  document.getElementById("protein").value = "";
}

async function save() {
  const user = auth.currentUser;
  var meal_doc = document.getElementById("meal").value;
  var calories_doc = document.getElementById("calories").value;
  var fat_doc = document.getElementById("fat").value;
  var carbs_doc = document.getElementById("carbs").value;
  var protein_doc = document.getElementById("protein").value;
  // console.log(user.uid);
  await setDoc(doc(collection(doc(collection(db, "users"),user.uid),"nutrition")), {
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
