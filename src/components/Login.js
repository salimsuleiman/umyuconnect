import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASEURL, LOGINUSER } from "../privates";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

axios.defaults.baseURL = BASEURL;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        umyukconnect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ auth, setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  let history = useHistory();
  const HandleSubmit = async (e) => {
    setOpen(true)
    setLoading(true);
    e.preventDefault();
    try {
      let response = await LOGINUSER(username, password);

      setAuth({
        ...auth,
        is_authenticated: true,
        user: response.user,
        token: response.token,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setMessage("wrong credentials - please try again");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>

        
        </>
      ) : null}
      <Grid container component="main" sx={{ height: "100vh" }}>
       <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={() => setOpen(false)}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/company/2021/imperfect-by-design/header-darker.jpg.img.fullhd.medium.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => HandleSubmit(e)}
              sx={{ mt: 1 }}
            >
              {message !== "" ? (
                <Alert severity="error">{message}</Alert>
              ) : null}

              <TextField
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="username"
                autoFocus
              />

              <TextField
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
