//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import "./index.js";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import FitnessHome from "./pages/FitnessHome";
import NutritionHome from "./pages/user_pages/NutritionHome";
import UserHome from "./pages/user_pages/UserHome";
import UserProfile from "./pages/user_pages/UserProfile";
import Login from "./containers/Login";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect,
  // useNavigate,
} from "react-router-dom";
// import { render } from "react-dom";
// import { ReactDOM } from "react";
import {
  IconButton,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID
} from '@mui/material/styles';
import colors from '@mui/joy/colors';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

const materialTheme = materialExtendTheme();

//------------------------------------------------------------------
//Firebase imports
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   connectAuthEmulator,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// export const txtEmail = document.querySelector("#txtEmail");
// export const txtPassword = document.querySelector("#txtPassword");
// export const btnLogin = document.querySelector("#btnLogin");

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyBnUdeuOgI138qZDqv3ZtZ6n0jzQe5uDok",
//   authDomain: "total-fitness-c4eae.firebaseapp.com",
//   projectId: "total-fitness-c4eae",
//   storageBucket: "total-fitness-c4eae.appspot.com",
//   messagingSenderId: "861678033534",
//   appId: "1:861678033534:web:f99e0ef9b7dbf7d14e162f",
//   measurementId: "G-V9HJVL60R3",
// });

// const auth = getAuth(firebaseApp);
// //Local emulator for testing
// connectAuthEmulator(auth, "http://localhost:9899");

// const loginEmailPassword = async () => {
//   const loginEmail = txtEmail.value;
//   const loginPassword = txtPassword.value;
//   const userCredentail = await signInWithEmailAndPassword(
//     auth,
//     loginEmail,
//     loginPassword
//   );
//   console.log(userCredentail.user);
// };

// if (btnLogin != null) {
//   btnLogin.addEventListener("click", loginEmailPassword);
// }

// const db = getFirestore(firebaseApp);

// //Detect Authentication State
// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("User logged in");
//   } else {
//     console.log("No User");
//   }
// });
//--------------------------------------------------------------
//const db = getFirestore(app);
// const analytics = getAnalytics(app);
//

const lst = ["item1", "item2", "item3"];
///home/nick/Documents/CSE115/total-fitness/src/pages/about.js

function App() {
  //Firebase Stuff
  //var firebase = require("firebase");
  //var firebaseui = require("firebaseui");
  //var ui = new firebaseui.auth.AuthUI(firebase.auth());

  const [anchor, setAnchor] = useState(null);
  const menuOptions = [
    "home",
    "about",
    "userHome",
    "nutritionHome",
    "fitnessHome",
    "userProfile",
  ];

  //------------------------------------------------------------------

  const [selected, setSelected] = useState(-1);

  //Lock the menu open when clicked
  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  //Closes Menu on Click
  const closeMenu = () => {
    setAnchor(null);
  };

  // On Selecting an item from the menu
  const onMenuItemClick = (event, index) => {
    setAnchor(null);
    setSelected(index);
  };

  const openLogin = (event) => {
    setAnchor(event.currentTarget);
  };

  // Allows for page redirects
  // let navigate = useNavigate();
  // const routeChange = (index) => {
  //   let path = `./About`;
  //   navigate(path);
  // };

  //const navigate = useNavigate();
  
  // https://mui.com/joy-ui/guides/using-joy-ui-and-material-ui-together/

  // https://mui.com/x/react-date-pickers/date-picker/

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
       <JoyCssVarsProvider>
    <div
      className="home"
      style={{
        color: "black",
      }}
    >
      <Box sx={{ flexgrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={openMenu}
              size="large"
              edge="start"
              aria-label="menu"
              color="white"
              sx={{ mr: 2 }}
            >
              Menu
            </IconButton>
            <Menu
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={closeMenu}
              keepMounted
            >
              {menuOptions.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => {
                    document.location.href = "/" + item;
                    console.log(item);
                  }}
                  selected={index === selected}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Total Fitness
            </Typography>
            <div id="login">
              <Button id="loginButton" color="inherit">
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="routing">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/FitnessHome" element={<FitnessHome />} />
              <Route path="/NutritionHome" element={<NutritionHome />} />
              <Route path="/UserHome" element={<UserHome />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
    </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
    </LocalizationProvider>
  );
  
  //return <Home />;
  //return <Login />;
  // const title = "Total-Fitness";
  // return (
  //   <Container sx={{ bgcolor: "lightblue", height: "100vh" }}>
  //     <Typography variant="h1">Total Fitness</Typography>
  //     <Box sx={{ display: "flex" }}>
  //       {lst.map((service) => (
  //         <Paper elevation={3}>
  //           <Typography>{service}</Typography>
  //         </Paper>
  //       ))}
  //     </Box>
  //   </Container>
  // );
}

/*
<Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/FitnessHome" element={<FitnessHome />} />
              <Route path="/NutritionHome" element={<NutritionHome />} />
              <Route path="/UserHome" element={<UserHome />} />
              <Route path="/UserProfile" element={<UserProfile />} />
            </Routes>
          </div>
        </Router>
*/

export default App;
