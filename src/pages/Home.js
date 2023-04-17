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
  const menuOptions = ["temp1", "temp2", "temp3"];
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
                  onlcick={(event) => onMenuItemClick(event, index)}
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
        classname="title"
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
      </div>
      <div classname="landingBody"></div>
    </div>
  );
}
export default Home;
