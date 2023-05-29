//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import "./index.js";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import FitnessHome from "./pages/FitnessHome";
import NutritionHome from "./pages/user_pages/NutritionHome";
import UserHome from "./pages/user_pages/UserHome";
import UserProfile from "./pages/user_pages/UserProfile";
import Login from "./containers/Login";
import Register from "./containers/Register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import Summary from "./pages/Summary";
import SharedContext from "./pages/user_pages/components/SharedContext";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

const materialTheme = materialExtendTheme();

function App() {
  const [user, loading, error] = useAuthState(auth);

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
