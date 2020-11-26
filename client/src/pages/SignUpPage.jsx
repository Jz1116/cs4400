import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { toast } from "react-toastify";
import axios from "axios";
import StudentSignUp from "../components/StudentSignUp/StudentSignUp";
import EmployeeSignUp from "../components/EmployeeSignUp/EmployeeSignUp";
import * as Constants from "../Constants";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Team 60
      {` ${new Date().getFullYear()}`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("East");
  const [housing, setHousing] = useState("Greek Housing");
  const [jobTypes, setJobTypes] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (status === "student") {
      const formData = new FormData(event.target);
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      const form = {
        fname: firstName,
        lname: lastName,
        username,
        email,
        password,
        location,
        housing,
      };
      const encodedForm = JSON.stringify(form);
      axios
        .post(Constants.CREATE_STUDENT_API_URL, { encodedForm })
        .then((response) => {
          if (response.data.success) {
            toast.success(
              "👏 A student account has already been created! Please go back to the sign in page to login with your username and password."
            );
          }
        });
    } else if (status === "employee") {
      const formData = new FormData(event.target);
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const phoneNum = formData.get("phoneNum");

      const form = {
        fname: firstName,
        lname: lastName,
        username,
        email,
        password,
        phoneNum,
        isLabTech: jobTypes.includes("Lab Tech"),
        isTester: jobTypes.includes("Site Tester"),
      };

      const encodedForm = JSON.stringify(form);
      axios
        .post(Constants.CREATE_EMPLOYEE_API_URL, { encodedForm })
        .then((response) => {
          if (response.data.success) {
            toast.success(
              "👏 An employee account has already been created! Please go back to the sign in page to login with your username and password."
            );
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirm Password"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup
                color="primary"
                aria-label="large outlined primary button group"
                fullWidth
              >
                <Button onClick={() => setStatus("student")}>Student</Button>
                <Button onClick={() => setStatus("employee")}>Employee</Button>
              </ButtonGroup>
            </Grid>
            {status === "student" && (
              <StudentSignUp
                setHousing={setHousing}
                setLocation={setLocation}
              />
            )}
            {status === "employee" && (
              <EmployeeSignUp setJobTypes={setJobTypes} />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
