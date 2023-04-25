import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { auth } from "../config/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export const txtEmail = document.querySelector("#txtEmail");
export const txtPassword = document.querySelector("#txtPassword");
export const btnLogin = document.querySelector("#btnLogin");

const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;
  const userCredentail = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );
  console.log(userCredentail.user);
};

if (btnLogin != null) {
  btnLogin.addEventListener("click", loginEmailPassword);
}

//Detect Authentication State
// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("User logged in");
//   } else {
//     console.log("No User");
//   }
// });

export default function Login() {
  console.log("Login");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const data = new FormData(event.currentTarget);
    const loginEmail = data.get("user-email");
    const loginPassword = data.get("user-password");
    const userCredentail = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredentail.user);
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // // Create logic to actually login and not print username and password to console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user-email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="user-password"
            label="Password"
            name="password"
            autoComplete="current-password"
            autoFocus
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember Me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot or Reset Password
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Create and Account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
