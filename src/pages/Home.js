/*
This page will contain the landig page for the website
Reqs
    - User login
    - General Information about the app
        - features
            - Describe two main aspects fo the app nutriciton and fitness
    - Maybe some user interaction
*/

import React, { useEffect } from "react";
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
import { Outlet } from "react-router-dom";
import SharedContext from "./user_pages/components/SharedContext";
import NavBar from "../home_components/NavBar";
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

  return (
    <div>
      <SharedContext.Consumer>
        {({ user, setUser }) => <NavBar user={user} setUser={setUser}/>}
      </SharedContext.Consumer>
    </div>
  );
}
export default Home;
