//import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Login from "./containers/Login";

const lst = ["item1", "item2", "item3"];
const App = () => {
  return <Login />;
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
};

export default App;
