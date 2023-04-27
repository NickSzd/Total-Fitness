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
import Register from "./containers/Register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID,
} from "@mui/material/styles";
import colors from "@mui/joy/colors";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

const materialTheme = materialExtendTheme();

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
                    <MenuIcon />
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
                    <Route path="/Register" element={<Register />} />
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
}

export default App;
