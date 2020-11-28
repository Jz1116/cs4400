import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import WelcomeImage from "../img/welcomeImage.jpg";
import { LOGIN_API_URL } from "../Constants";

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
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${WelcomeImage})`,
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    setName(username);
    const password = formData.get("password");

    axios
      .post(LOGIN_API_URL, {
        username,
        password,
      })
      .then((response) => {
        setStatus(response.data.status);
      });
  };

  if (status === "labtech/tester") {
    return (
      <Redirect
        to={{
          pathname: "/labtech+tester",
          state: { name },
        }}
      />
    );
  }
  if (status === "labtech") {
    return (
      <Redirect
        to={{
          pathname: "/labtech",
          state: { name },
        }}
      />
    );
  }
  if (status === "tester") {
    return (
      <Redirect
        to={{
          pathname: "/tester",
          state: { name },
        }}
      />
    );
  }
  if (status === "admin") {
    return (
      <Redirect
        to={{
          pathname: "/admin",
          state: { name },
        }}
      />
    );
  }
  if (status === "student") {
    return (
      <Redirect
        to={{
          pathname: "/student",
          state: { name },
        }}
      />
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            GT COVID-19 Testing
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => handleSubmit(event)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Sign In
            </Button>
            {status === "invalid username/password" ? (
              <Alert severity="warning" onClose={() => setStatus("")}>
                <AlertTitle>Wrong email/password. Try Again.</AlertTitle>
              </Alert>
            ) : null}
            <Grid container>
              <Grid item xs>
                <Link to="/signup" variant="body2">
                  Do not have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
