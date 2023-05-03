/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
*/
import React, { useState } from "react";
import "../../UserPage.css";
import { Style } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import PieChartComponent from "./components/pieChart";
import PieCaloriesComponent from "./components/pieCalories";
import PressableCardBoards from "./components/workOutTable";
import NutritionHome from "./NutritionHome";
import UserCalendar from "./components/userCalendar";

const drawerWidth = 240;
const userPages = ["Home", "Fitness", "Nutrition"]; // Holds Items for navbar
const settings = ["Profile", "Account", "Dashboard", "Logout"]; // items for user profile

function UserHome(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  /*
  Configures the drawer so that the user can access user pages
  */
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {userPages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [activeTab, setActiveTab] = useState(0);
  const tabs = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="profile-header">
        <AccountCircle sx={{ ...Style.accountBox, fontSize: "250px" }} />
        <div className="user-name">
          <h3>Username</h3>

          <div className="user-bio">
            <p className="bio">
              {" "}
              I want to improve my shirt size, so I want to go to gym.{" "}
            </p>
            <div className="user-mail">
              <p>xlismysize@ucsc.edu</p>
              <div className="change-profile-btn">
                <button>
                  <i></i> change profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
        Creates nav bar so the user can move between user the users pages
        home
        fitness
        nutrition
      */}
      <div className="userNav">
        <AppBar component="nav" position="relative">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {userPages.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </AppBar>
      </div>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <div className="right-side">
        <div className="nav">
          <ul>
            <li
              onClick={() => tabs(0)}
              className={activeTab === 0 ? "active user-goal" : "user-goal"}
            >
              Goal
            </li>
            <li
              onClick={() => tabs(1)}
              className={
                activeTab === 1 ? "active user-nutrition" : "user-nutrition"
              }
            >
              Nutrition
            </li>
            <li
              onClick={() => tabs(2)}
              className={
                activeTab === 2 ? "active user-workout" : "user-workout"
              }
            >
              Workout
            </li>
            <li
              onClick={() => tabs(3)}
              className={
                activeTab === 3 ? "active user-calendar" : "user-calendar"
              }
            >
              Calendar
            </li>
            <li
              onClick={() => tabs(4)}
              className={
                activeTab === 4 ? "active user-summary" : "user-summary"
              }
            >
              Summary
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 0 && (
              <div>
                <PieChartComponent />
                <PieCaloriesComponent />
              </div>
            )}
            {activeTab === 1 && <NutritionHome />}
            {activeTab === 2 && (
              <div>
                <PressableCardBoards />
              </div>
            )}
            {activeTab === 3 && (
              <div className="daily-preview-calendar">
               <UserCalendar />
              </div>
            )}
            {activeTab === 4 && (
              <div className="daily-preview-summary">
                <p>Summery</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
