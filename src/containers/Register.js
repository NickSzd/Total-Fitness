import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../config/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import SelectInput from "@mui/material/Select/SelectInput";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const user_collection = collection(db, "users");
=======
const users_collection  = collection(db, "users");
>>>>>>> 8120caad82123561a12d564a25335dd761983d21

function Copyright(props) {
  
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/*
Default User
First Name: Name
Last Name: company
email: name@company.com
passowrd: password123
*/
// ADD FIREBASE STUFF

export default function Register() {
  const history = useNavigate();
  //Rregister a user
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get user data
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Register User
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const nutrition_collection = collection(doc(users_collection ,user.uid),"nutrition")
        const workout_collection = collection(doc(users_collection ,user.uid),"workout")


        await setDoc(doc(users_collection,user.uid), {
          userID : user.uid,
<<<<<<< HEAD
          email : email,
          firstName: firstName,
          lastName: lastName,
=======
          email : email

        })
        await setDoc(doc(nutrition_collection), {
          userID : user.uid,

        })
        await setDoc(doc(workout_collection), {
          userID : user.uid,
>>>>>>> 8120caad82123561a12d564a25335dd761983d21

        })
        
      await updateProfile(user, { displayName: firstName });
        alert("User Created");
        window.location.href = "userHome";
        history("/userHome")

        // return userCredential.updateProfile({dis})
        //ADD REDIRECT TO USER HOME PAGE
      })
      .catch((error) => {
        console.log("Error Creating User");
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error code: "+ errorCode);
        console.log("Error Message: "+ errorMessage);
        // ..
      });

    const data = new FormData(event.currentTarget);

  };
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive emails."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="\Login" variant="body2">
                  Already have an account? Sign in
                  {/* LINK TO LOGIN PAGE */}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
