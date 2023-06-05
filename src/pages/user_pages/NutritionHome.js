import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import NutritionTable from "./components/nutritionTable";
import { auth, db, db_n } from "../../config/firebase";
import ModalDialog from "@mui/joy/ModalDialog";
import { serverTimestamp } from 'firebase/firestore'
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

import { Container, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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
  const timestamp = serverTimestamp();
  // console.log(user.uid);
  
  await setDoc(doc(collection(doc(collection(db, "users"),user.uid),"nutrition")), {
    meal: meal_doc,
    calories: Number(calories_doc),
    fat: Number(fat_doc),
    carbohydrates: Number(carbs_doc),
    protein: Number(protein_doc),
    day: timestamp
  });
  clear_box();
  alert("Added Meal");
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function NutritionHome() {
  const [data, setData] = useState([
    { name: "Fat", value: 0, fill: "#8884d8" },
    { name: "Carbohydrate", value: 0, fill: "#82ca9d" },
    { name: "Protein", value: 0, fill: "#ffc658" },
  ]);

  dayjs.extend(utc);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function handleNutritionSubmit(){
    
  }

  function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    return (
      <form onSubmit={handleNutritionSubmit}>
        <Container maxWidth="md" sx={{ mb: 20 }}>
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: 400}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ml:1, mt:5}}> 
            Search
          </Button>
        </Container>
      </form>
      
    );
  }

  return (
    <>
      <Grid container spacing={0} sx={{ flexGrow: 1 }} alignItems="center">
        <Grid xs={4}>
          <Button variant="contained" onClick={handleOpen} sx={{ ml: 1 }} > Add Meal</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalDialog
              aria-labelledby="basic-modal-dialog-title"
              aria-describedby="basic-modal-dialog-description"
              sx={{ maxWidth: 1000 }}
              >
                {/* inside the modal */}
                <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
                  <AppBar position="static">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="My Meals" {...a11yProps(0)} />
                    <Tab label="Search Meal" {...a11yProps(1)} />
                    </Tabs>
                  </AppBar>
                  <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
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
                        <Button variant="contained" onClick={() => { save(); handleClose();}}>
                          Add Meal
                          <AddIcon />
                        </Button>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    {SearchBar()}
                    </TabPanel>
                  </SwipeableViews>
                </Box>
              </ModalDialog>
            </Modal>
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
