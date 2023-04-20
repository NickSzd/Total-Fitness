//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import FitnessHome from "./pages/FitnessHome";
import NutritionHome from "./pages/user_pages/NutritionHome";
import UserHome from "./pages/user_pages/UserHome";
import UserProfile from "./pages/user_pages/UserProfile";
import Login from "./containers/Login";
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
import { useState } from "react";

const lst = ["item1", "item2", "item3"];
///home/nick/Documents/CSE115/total-fitness/src/pages/about.js

function App() {
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

  const openLogin = () => {
    console.log("login call");
  };

  // Allows for page redirects
  // let navigate = useNavigate();
  // const routeChange = (index) => {
  //   let path = `./About`;
  //   navigate(path);
  // };

  //const navigate = useNavigate();
  return (
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
              Menu
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
            <Button id="loginButton" color="inherit">
              Login
            </Button>
            {/* <button
              id="loginButton"
              class="float-left submit-button"
              color="inherit"
            >
              Login
            </button> */}
            <script type="text/javascript">
              //console.log("Button Clicked");
              document.getElementById("loginButton").onclick =
              console.log("button click event");
              {/* {
                //(location.href = "/Login")
              } */}
              ;
            </script>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="routing">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/FitnessHome" element={<FitnessHome />} />
              <Route path="/NutritionHome" element={<NutritionHome />} />
              <Route path="/UserHome" element={<UserHome />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
  //return <Home />;
  //return <Login />;
  // const title = "Total-Fitness";
  // return (
  //   <Container sx={{ bgcolor: "lightblue", height: "100vh" }}>
  //     <Typography variant="h1">Total Fitness</Typography>
  //     <Box sx={{ display: "flex" }}>
  //       {lst.map((service) => (
  //         <Paper elevation={3}>
  //           <Typography>{service}</Typography>
  //         </Paper>
  //       ))}
  //     </Box>
  //   </Container>
  // );
}

/*
<Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/FitnessHome" element={<FitnessHome />} />
              <Route path="/NutritionHome" element={<NutritionHome />} />
              <Route path="/UserHome" element={<UserHome />} />
              <Route path="/UserProfile" element={<UserProfile />} />
            </Routes>
          </div>
        </Router>
*/

export default App;
