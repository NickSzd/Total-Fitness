import { Box, Container, Paper, Typography } from "@mui/material";
import "./App.css";

const lst = ["item1", "item2", "item3"];
const App = () => {
  const title = "Total-Fitness";
  return (
    <Container sx={{ bgcolor: "lightblue", height: "100vh" }}>
      <Typography variant="h1">Total Fitness</Typography>
      <Box sx={{ display: "flex" }}>
        {lst.map((service) => (
          <Paper elevation={3}>
            <Typography>{service}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
  //const isUserLogedIn = false; // render login button
  // return (
  //   <div className="App">
  //     <h1>Hello</h1>
  //   </div>
  // );
};

export default App;
