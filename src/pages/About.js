/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
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
import "../App.css";
function About() {
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
  return (
    <div>
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
      <h1>About Page</h1>
      <div class="main" id="about">
        <div class="main__container">
          <div class="main__img--container">
            <div class="main__img--card">
              <i class="fas fa-layer-group"></i>
            </div>
          </div>
          <div class="main__content">
            <h1>What do we do?</h1>
            <h2>We help people reach their fitness goal</h2>
            <p>
              Login and start tracking your daily nutrition and workout plan for
              greater rewards for yourself.
            </p>
            <button class="main__btn">
              <a href="\Register">Sign up</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const About = () => {
//   return (
//     <div>
//       <h1>About Page</h1>
//     </div>
//   );
// };

export default About;
