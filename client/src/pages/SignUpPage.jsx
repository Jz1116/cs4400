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
import Alert from "@material-ui/lab/Alert";
import * as EmailValidator from "email-validator";
import AlertTitle from "@material-ui/lab/AlertTitle";
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
  const [alertStatus, setAlertStatus] = useState("");
  const [location, setLocation] = useState("East");
  const [housing, setHousing] = useState("Greek Housing");
  const [jobTypes, setJobTypes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // handle corner cases
    if (firstName === "") {
      setAlertStatus("fname");
      return;
    }
    if (lastName === "") {
      setAlertStatus("lname");
      return;
    }
    if (username === "") {
      setAlertStatus("username");
      return;
    }
    if (email === "") {
      setAlertStatus("email");
      return;
    }
    if (email.length < 5) {
      setAlertStatus("email < 5");
      return;
    }
    if (email.length > 25) {
      setAlertStatus("email > 25");
      return;
    }
    if (EmailValidator.validate(email) === false) {
      setAlertStatus("email not valid");
      return;
    }
    if (password === "") {
      setAlertStatus("password");
      return;
    }
    if (confirmPassword === "") {
      setAlertStatus("confirmPassword");
      return;
    }
    if (password !== confirmPassword) {
      setAlertStatus("password not matched");
      return;
    }
    if (password.length < 8) {
      setAlertStatus("password < 8");
      return;
    }
    const res1 = await axios.get(
      `${Constants.UNIQUE_USER_API_URL}/${username}`
    );
    if (res1.data.isUnique === false) {
      setAlertStatus("username not unique");
      return;
    }

    const res2 = await axios.get(
      `${Constants.UNIQUE_USER_API_URL}/${firstName}/${lastName}`
    );
    if (res2.data.isUnique === false) {
      setAlertStatus("full name not unique");
      return;
    }

    // create account
    if (status === "student") {
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
      const phoneNum = formData.get("phoneNum");
      const isLabTech = jobTypes.includes("Lab Tech");
      const isTester = jobTypes.includes("Site Tester");

      if (isLabTech === false && isTester === false) {
        setAlertStatus("jobtype");
        return;
      }

      const form = {
        fname: firstName,
        lname: lastName,
        username,
        email,
        password,
        phoneNum,
        isLabTech,
        isTester,
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
                name="confirmPassword"
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
          {alertStatus === "fname" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your first name.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "lname" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your last name.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "username" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your username.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "email" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your email.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "password" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your password.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "jobtype" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out your job type.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "confirmPassword" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please confirm your password.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "password not matched" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Password do not match.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "password < 8" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>
                Password must be at least 8 characters in size.
              </AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "email < 5" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>
                Email must be at least 5 characters in size.
              </AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "email > 25" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>
                Email shall not surpass 25 characters in size.
              </AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "email not valid" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>The email you entered is not valid.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "username not unique" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Username is not unique.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "full name not unique" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Full name is not unique.</AlertTitle>
            </Alert>
          ) : null}
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
