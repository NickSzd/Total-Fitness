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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import SharedContext from "../pages/user_pages/components/SharedContext";

function NavBar() {
  const history = useNavigate();
  const ctx = useContext(SharedContext);
  const { user, loading, error } = ctx;
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
                  onClick={() => {
                    closeMenu();
                    history(item === "home" ? "/" : item);
                  }}
                  selected={index === selected}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h4" component="div" sx={{ flexGrow: 20 }}>
              <div id="Home">
                <Button
                  id="HomeButton"
                  color="inherit"
                  onClick={() => {
                    history("/");
                  }}
                >
                  <h1>Total Fitness</h1>
                </Button>
              </div>
            </Typography>
            {!loading ? (
              <div id="login">
                <Button id="loginButton" color="inherit" onClick={handleClick}>
                  {user ? "Logout" : "Login"}
                </Button>
              </div>
            ) : null}

            {!loading
              ? !user && (
                  <div id="Register">
                    <Button
                      id="RegisterButton"
                      color="inherit"
                      onClick={() => {
                        history("/Register");
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )
              : null}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default NavBar;
