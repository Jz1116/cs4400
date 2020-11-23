import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";

const sites = ["CRC", "CoC", "CoB"];
const username = "dmcstuffins7";
const fullName = "Doc McStuffins";
const assignedSites = ["CRC", "CoC"];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
    margin: theme.spacing(3, 0, 6),
    textTransform: "none",
  },
}));

export default function TestingSiteChange() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Tester Change Testing Site
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Username:</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>{username}</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Full Name:</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>{fullName}</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Assigned Sites:</InputLabel>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                id="sites"
                options={sites}
                getOptionLabel={(option) => option}
                defaultValue={assignedSites}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
