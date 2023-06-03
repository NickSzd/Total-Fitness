//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import "./index.js";
import React, { createContext } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import FitnessHome from "./pages/FitnessHome";
import NutritionHome from "./pages/user_pages/NutritionHome";
import UserHome from "./pages/user_pages/UserHome";
import UserProfile from "./pages/user_pages/UserProfile";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Start from "./pages/user_pages/components/Questionaire/start"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   IconButton,
//   Button,
//   Typography,
//   Box,
//   AppBar,
//   Toolbar,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID,
} from "@mui/material/styles";
//import colors from "@mui/joy/colors";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import Summary from "./pages/Summary";
import SharedContext from "./pages/user_pages/components/SharedContext";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
//import React, { createContext, useRef } from "react";

const materialTheme = materialExtendTheme();

//const lst = ["item1", "item2", "item3"];
///home/nick/Documents/CSE115/total-fitness/src/pages/about.js

function App() {
  const [anchor, setAnchor] = useState(null);
  // const menuOptions = [
  //   "home",
  //   "about",
  //   "userHome",
  //   "nutritionHome",
  //   "fitnessHome",
  //   "userProfile",
  // ];

  //------------------------------------------------------------------


  const [selected, setSelected] = useState(-1);
  // const [user, setUser] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  //const scrollRef = useRef(null);
  //Lock the menu open when clicked
  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };


  // //Closes Menu on Click
  // const closeMenu = () => {
  //   setAnchor(null);
  // };

  // // On Selecting an item from the menu
  // const onMenuItemClick = (event, index) => {
  //   setAnchor(null);
  //   setSelected(index);
  // };

  // const openLogin = (event) => {
  //   setAnchor(event.currentTarget);
  // };

  //const navigate = useNavigate();

  // https://mui.com/joy-ui/guides/using-joy-ui-and-material-ui-together/

  // https://mui.com/x/react-date-pickers/date-picker/

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <div
            className="home"
            style={{
              color: "black",
            }}
          >
            <div className="routing">
              <Router>
                <div>
                  <SharedContext.Provider value={{ user, loading, error }}>
                    <Routes>
                      <Route path="/" element={<Home />}>
                        <Route index exact element={<Summary />} />
                        <Route path="/About" element={<About />} />
                        <Route
                          path="/FitnessHome"
                          element={
                            <AuthenticatedRoute>
                              <FitnessHome />
                            </AuthenticatedRoute>
                          }
                        />
                        <Route
                          path="/NutritionHome"
                          element={
                            <AuthenticatedRoute>
                              <NutritionHome />
                            </AuthenticatedRoute>
                          }
                        />
                        <Route
                          path="/UserHome"
                          element={
                            <AuthenticatedRoute>
                              <UserHome />
                            </AuthenticatedRoute>
                          }
                        />
                        <Route
                          path="/UserProfile"
                          element={
                            <AuthenticatedRoute>
                              <UserProfile />
                            </AuthenticatedRoute>
                          }
                        />
                      </Route>
                      <Route path="/Login" element={<Login />} />
                      <Route path="/Register" element={<Register />} />
                      <Route path="/Start" element={<Start />} />
                    </Routes>
                  </SharedContext.Provider>
                </div>
              </Router>
            </div>
            <div id="firebaseui-auth-container"></div>
          </div>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </LocalizationProvider>
  );
}

export default App;