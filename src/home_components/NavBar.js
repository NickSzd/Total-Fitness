import React, { useEffect } from "react";
import "../App";
import {
  Button,
  IconButton,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

function NavBar({ user, setUser }) {
  const history = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleClick = () => {
    const auth = getAuth();
    user
      ? signOut(auth)
          .then(() => {
            history("/", { replace: true });
          })
          .catch((error) => {
            console.log(error);
          })
      : history("/Login");
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser.uid);
        localStorage.setItem("user", loggedInUser.uid);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);
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
              sx={{ mr: 2, color: "white" }}
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
                    document.location.href =
                      "/" + (item === "home" ? "" : item);
                  }}
                  selected={index === selected}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h4" component="div" sx={{ flexGrow: 20 }}>
              <div id="Home">
                <Button id="HomeButton" color="inherit" href="/">
                  <h1>Total Fitness</h1>
                </Button>
              </div>
            </Typography>

            <div id="login">
              <Button id="loginButton" color="inherit" onClick={handleClick}>
                {localStorage.getItem("user") ? "Logout" : "Login"}
              </Button>
            </div>

            {!localStorage.getItem("user") && (
              <div id="Register">
                <Button id="RegisterButton" color="inherit" href="/Register">
                  Register
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default NavBar;
