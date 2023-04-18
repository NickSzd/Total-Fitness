//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import FitnessHome from "./pages/FitnessHome";
import NutritionHome from "./pages/user_pages/NutritionHome";
import UserHome from "./pages/user_pages/UserHome";
import UserProfile from "./pages/user_pages/UserProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  useNavigate,
} from "react-router-dom";
import { render } from "react-dom";
import { ReactDOM } from "react";
const lst = ["item1", "item2", "item3"];
///home/nick/Documents/CSE115/total-fitness/src/pages/about.js

function App() {
  //const navigate = useNavigate();
  return (
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

export default App;
