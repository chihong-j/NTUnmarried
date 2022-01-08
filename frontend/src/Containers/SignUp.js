import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

export default function SignUp({setUserStatus}) {
  const [errorMessage, setErrorMessage] = useState("")
  const [birth, setBirth] = useState(new Date())
  const [gender, setGender] = useState(true);
  const myPassword = 'password1';
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var name = data.get('name');
    var department = data.get('department');
    // var gender = data.get('gender');
    // var birth = data.get('birth');
    var email = data.get('email');
    var password = data.get('password');
    // 加密
    password = create(password);
    // 傳給後端
    console.log({
        Name: name,
        Department: department,
        Gender: gender,
        Birth: birth,
        Email: email,
        Password: password,
    });
    setErrorMessage("");
    if (email.slice(9) !== "@ntu.edu.tw") {
        setErrorMessage("You must use NTU mail to sign up.")
    }
    else if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters.")
    }
    else if (!/[a-zA-z]/i.test(password)) {
        setErrorMessage("Password must contains at least one english character.")
    }
    else {
        setUserStatus("login");
    }
  };
  const create = async (password) => {
    password = await bcrypt.hash(password, 10);
    return password;
  }


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
            Sign up
          </Typography>
          <Typography sx={{ marginTop: 1, color: 'error.main' }} >
            {errorMessage}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                  autoComplete="department"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
                <Select
                    required
                    fullWidth   
                    labelId="demo-simple-select-label"
                    id="gender"
                    label="Gender"
                    value={gender}
                    name="gender"
                    autoComplete="gender"
                    onChange={(e) => {
                      setGender(e.target.value)
                    }}
                    >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    required
                    fullWidth
                    name="birth"
                    id="birth"
                    label="Date of Birth"
                    inputFormat="MM/dd/yyyy"
                    value={birth}
                    onChange={(newValue) => {
                      setBirth(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
                <Link href="" variant="body2" onClick={() => setUserStatus("login")}>
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