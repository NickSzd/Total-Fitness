/*
This page will contain the landig page for the website
Reqs
    - User login
    - General Information about the app
        - features
            - Describe two main aspects fo the app nutriciton and fitness
    - Maybe some user interaction
*/

import React from "react";
import "../App.css";
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
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

// import { Menu } from "@mui/icons-material";
// import Menu from "@mui/material";

function Home() {
  // Sets Up the Menu Button
  /*
  For Now this is a tempory button that will allow access to 
    User Home
    Fitness Home
    Nutrition Home
    Landing Page
  Eventually this will be for contact, info, and about
  */
  const [anchor, setAnchor] = useState(null);
  const menuOptions = [
    "home",
    "about",
    "userHome",
    "nutritionHome",
    "fitnessHome",
    "userProfile",
  ];
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

  // Allows for page redirects
  // let navigate = useNavigate();
  // const routeChange = (index) => {
  //   let path = `./About`;
  //   navigate(path);
  // };

  return (
    <div className="home">
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
              {menuOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => {
                    console.log(index);
                  }}
                  selected={index === selected}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Total Fitness
            </Typography>
            <Button id="loginButton" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        className="title"
        style={{
          color: "blue",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <h1>Total Fitness</h1>
        <strong style={{ color: "black" }}>
          {" "}
          The Complete Fitness Application
        </strong>
        <h1>
          Right now this is super gheto just type /pagename after local host to
          whatever page you are working on
        </h1>
      </div>
      <div className="landingBody"></div>
    </div>
  );
}
export default Home;
