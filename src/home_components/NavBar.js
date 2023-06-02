import React, { useEffect, useRef } from "react";
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
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import SharedContext from "../pages/user_pages/components/SharedContext";

function NavBar() {
  const history = useNavigate();
  const ctx = useContext(SharedContext);
  const { user, loading, error } = ctx;
  const [anchor, setAnchor] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); // Added state to track scroll
  const scrollRef = useRef(null);
  const menuOptions = [
    "userHome",
    "nutritionHome",
    "fitnessHome",
    "userProfile",
  ];
  const isLoggedIn = !!user; // Check if user is logged in

  //------------------------------------------------------------------

  const [selected, setSelected] = useState(-1);

  // Lock the menu open when clicked
  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  // Closes Menu on Click
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

  const handleHomeButtonClick = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    } else {
      history("/");
    }
  };

  const handleFeatureButtonClick = () => {
    const homeSection = document.getElementById("feature");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    } else {
      history("/");
    }
  };

  const handleContactButtonClick = () => {
    const homeSection = document.getElementById("contact");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    } else {
      history("/");
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100; // Adjust this value to change the scroll threshold

    if (scrollPosition > scrollThreshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleAboutLinkClick = () => {
    const homeSection = document.getElementById("about");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    } else {
      history("/");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Box sx={{ flexgrow: 1 }}>
        <AppBar position={isScrolled ? "fixed" : "static"}>
          {" "}
          {/* Updated position based on scroll */}
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <div id="Home">
                <Button
                  id="HomeButton"
                  color="inherit"
                  onClick={handleHomeButtonClick}
                >
                  <h1>Total Fitness</h1>
                </Button>
              </div>
            </Typography>

            <Button
              id="homeButton"
              color="inherit"
              onClick={handleHomeButtonClick}
              sx={{ mr: 2 }}
            >
              Home
            </Button>

            <Button
              id="aboutButton"
              color="inherit"
              onClick={handleAboutLinkClick}
              selected={0 === selected}
              sx={{ mr: 2 }}
            >
              About
            </Button>

            <Button
              id="featureButton"
              color="inherit"
              onClick={handleFeatureButtonClick}
              sx={{ mr: 2 }}
            >
              Feature
            </Button>

            <Button
              id="contactButton"
              color="inherit"
              onClick={handleContactButtonClick}
              sx={{ mr: 2 }}
            >
              Contact
            </Button>

            {!loading && !isLoggedIn && (
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
            )}

            {!loading && !isLoggedIn && (
              <div id="login">
                <Button id="loginButton" color="inherit" onClick={handleClick}>
                  {user ? "Logout" : "Login"}
                </Button>
              </div>
            )}

            {!loading && isLoggedIn && (
              <div id="login">
                <Button id="loginButton" color="inherit" onClick={handleClick}>
                  {user ? "Logout" : "Logout"}
                </Button>
              </div>
            )}

            {isLoggedIn && (
              <IconButton
                onClick={openMenu}
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color: "white" }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Menu
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={closeMenu}
              keepMounted
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              getContentAnchorEl={null}
            >
              {isLoggedIn && // Only render menu options if user is logged in
                menuOptions.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      closeMenu();
                      history(item === "home" ? "/" : item);
                    }}
                    selected={index + 1 === selected}
                  >
                    {item}
                  </MenuItem>
                ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}

export default NavBar;
