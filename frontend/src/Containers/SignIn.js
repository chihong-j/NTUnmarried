// import * as React from 'react';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bcrypt from "bcryptjs";
import { LOGIN_MUTATION } from "../graphql";
import { useMutation } from '@apollo/client';
const LOCALSTORAGE_KEY_TOKEN = "token";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        @material-ui
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({setUserStatus, setUserName, setUserEmail}) {
  const [errorMessage, setErrorMessage] = useState("")
  var dataPassword
  const [logInUser, {data}] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      // console.log(data.login.password);
      dataPassword = JSON.parse(JSON.stringify(data.login.password))
      if (data.login.token) {
        localStorage.setItem(LOCALSTORAGE_KEY_TOKEN, data.login.token);
        // setUserStatus("logined");
      } else {
        console.log('login fail: No token.')
      }
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get('email');
    var password = data.get('password');
    if (email === "") {
      setErrorMessage("Email field required.")
    }
    else if (password === "") {
      setErrorMessage("Password field required.")
    }
    // var passwordHash = await create(password); 
    console.log({
      Email: email,
      Password: password,
    });
    try {
      await logInUser({
      variables: {
          email,
          password: password,
        },
      })
    }
    catch (error) {
      setErrorMessage('Email not found, please register first!')
    }
    // await console.log(dataPassword)
    let res = await validate(password, dataPassword)
    if (res) {
      // setUserName(email);
      setUserEmail(email);
      setUserStatus("logined");
    }
    else {
      setErrorMessage('incorrect password')
    }
  };

  const validate = (async(passwordInput, passwordBackend) => {
    let res = await bcrypt.compare(passwordInput, passwordBackend)
    // console.log(res)
    if (res) {
      console.log('password correct');
      return true;
    }
    else {
      console.log('password incorrect');
      return false;
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography sx={{ marginTop: 1, color: 'error.main' }} >
            {errorMessage}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setUserStatus("signup")} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
