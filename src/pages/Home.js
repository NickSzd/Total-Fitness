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
import MenuIcon from "@mui/icons-material/Menu";
//import "../Home.css";

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
  // Menu Options
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
  console.log("HOME");
  return (
    <div>
      <div className="navBar">
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
              <Typography variant="h4" component="div" sx={{ flexGrow: 20 }}>
                <div id="Home">
                  <Button id="HomeButton" color="inherit" href="/Home">
                    <h1>Total Fitness</h1>
                  </Button>
                </div>
              </Typography>
              <div id="login">
                <Button id="loginButton" color="inherit" href="/Login">
                  Login
                </Button>
              </div>
              <div id="Register">
                <Button id="RegisterButton" color="inherit" href="/Register">
                  Register
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="main" style={{ color: "white" }}>
        <h1>Total Fitness</h1>
        <strong> The Complete Fitness Application</strong>
        <h1>Access the page you are working on with the menu</h1>
        <div className="body">
          When You Start Working on Your page do the following
          <ol>
            <li>Pull the latest Version from git</li>
            <li>Create a branch titled with the page you are working on</li>
            <li>Make sure you are on that branch before you start working</li>
            <li>
              When you push make sure to add someone to review your request
            </li>
          </ol>
        </div>
        <div class="hero" id="home">
          <div class="hero__container">
            <h1 class="hero__heading">
              Make every bite count<span> towards a healthier you</span>
            </h1>
            <p class="hero__description">Unlimited Possibilities</p>
            <button class="main__btn">
              <a href="\About">Explore</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
