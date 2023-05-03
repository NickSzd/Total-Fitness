import React from "react";
import NutritionTable from "./components/nutritionTable";
import { db, db_n} from "../../config/firebase";
import { getFirestore,collection ,doc,getDoc, setDoc} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// import { getDocs, collection, where, query } from "firebase/firestore";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';


const nutrition_collection = collection(db, "nutrition");

function clear_box(){
  document.getElementById('meal').value = ''
  document.getElementById('calories').value = ''
  document.getElementById('fat').value = ''
  document.getElementById('carbs').value = ''
  document.getElementById('protein').value = ''
}
function save(){
  var meal_doc = document.getElementById('meal').value
  var calories_doc = document.getElementById('calories').value
  var fat_doc = document.getElementById('fat').value
  var carbs_doc = document.getElementById('carbs').value
  var protein_doc = document.getElementById('protein').value

  setDoc(doc(nutrition_collection), {
    meal : meal_doc,
    calories : calories_doc,
    fat : fat_doc,
    carbs : carbs_doc,
    protein : protein_doc

  });
  clear_box()
  alert("Added Meal");
}

function NutritionHome() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={save}>Add Meal<AddIcon /></Button>
      </Stack>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <Stack spacing={2} direction="row">
          <TextField
            id="meal"
            label="Meal"
            multiline
            maxRows={4}
          />
          <TextField
            id="calories"
            label="Calories"
            multiline
            maxRows={4}
            defaultValue={''}
          />
          <TextField
            id="fat"
            label="Fat (g)"
            multiline
            maxRows={4}
            defaultValue={''}
          />
          <TextField
            id="carbs"
            label="Carbs (g)"
            multiline
            maxRows={4}
            defaultValue={''}
          />
          <TextField
            id="protein"
            label="Protein (g)"
            multiline
            maxRows={4}
            defaultValue={''}
          />
        </Stack>
      </Box>
      <NutritionTable></NutritionTable>
    </div>
    
  );

}

export default NutritionHome;
