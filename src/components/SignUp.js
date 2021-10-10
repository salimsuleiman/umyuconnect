import { useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

// const SignUp = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <>
//       <h2 style={{ textAlign: "center" }}>UmyukConnect Signup</h2>
//       <h3 style={{ color: "#657786" }}>
//         Sign up to see blogs and photos from your friends.
//       </h3>
//       <form onSubmit={(e) => HandleSignup(e)}>
//         <div>
//           <input
//             type="text"
//             onInput={(e) => setFirstName(e.target.value)}
//             value={firstName}
//             placeholder="First Name"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             onInput={(e) => setLastName(e.target.value)}
//             value={lastName}
//             placeholder="Last Name"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             onInput={(e) => setUsername(e.target.value)}
//             value={username}
//             placeholder="Username"
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             onInput={(e) => setEmail(e.target.value)}
//             value={email}
//             placeholder="Email"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             onInput={(e) => setPassword(e.target.value)}
//             value={password}
//             placeholder="Password"
//           />
//         </div>
//         <div>
//           <button type="submit" className="btn">
//             Sign Up
//           </button>
//         </div>
//         <div className="form-site-footer">
//           {/* <a href="" className="forgot-password-link">Forgot password ?</a> */}
//           <span className="sign-up-link">
//             Already have an account? <Link to="/login">Sign in</Link>
//           </span>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SignUp;

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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        umyu connect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleSignup = (e) => {
  
    e.preventDefault();
    const SignUp = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/signup/",
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }
      );
    };
    if (username.trim() && lastName.trim() && email.trim() && password.trim() && firstName.trim()) {
      SignUp();
    } else {
      alert('please input all fields')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up and stay connect with umyu sites
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => HandleSignup(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onInput={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  autoComplete="fname"
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
                  onInput={(e) => setLastName(e.target.value)}
                  value={lastName}
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onInput={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onInput={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  fullWidth
                  id="email"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onInput={(e) => setPassword(e.target.value)}
                  value={password}
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
                  label="I want to Signup to umyu connect and stay connected with umyusites"
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
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
