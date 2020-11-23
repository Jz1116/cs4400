import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";

const { UsaStates } = require("usa-states");

const usStates = new UsaStates();
const states = usStates.arrayOf("abbreviations");

const locationTypes = ["East", "West"];
const siteTesters = ["Zhen Jiang", "Yihua Xu", "Zirui Wang", "Shuangyue Cheng"];

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

export default function TestingSiteForm() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a Testing Site
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="sitename"
                name="siteName"
                variant="outlined"
                required
                fullWidth
                id="siteName"
                label="Site Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="siteAddress"
                label="Site Address"
                name="siteAddress"
                autoComplete="siteaddress"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                select
                label="State"
                fullWidth
                autoFocus
                defaultValue="AL"
                variant="outlined"
                required
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                autoComplete="zipcode"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="location"
                select
                label="Location"
                fullWidth
                autoFocus
                variant="outlined"
                required
                defaultValue="East"
              >
                {locationTypes.map((locationType) => (
                  <MenuItem key={locationType} value={locationType}>
                    {locationType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="siteTester"
                select
                label="Site Tester"
                fullWidth
                autoFocus
                variant="outlined"
                required
                defaultValue="Zhen Jiang"
              >
                {siteTesters.map((siteTester) => (
                  <MenuItem key={siteTester} value={siteTester}>
                    {siteTester}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Site
          </Button>
        </form>
      </div>
    </Container>
  );
}
