import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { toast } from "react-toastify";
import * as Constants from "../../Constants";

const { UsaStates } = require("usa-states");

const usStates = new UsaStates();
const states = usStates.arrayOf("abbreviations");
const locationTypes = ["East", "West"];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
  },
}));

export default function CreateSite() {
  const classes = useStyles();
  const [location, setLocation] = useState("East");
  const [siteTester, setTester] = useState("");
  const [usaState, setUsaState] = useState("AL");
  const [testers, setTesters] = useState([]);
  const [alertStatus, setAlertStatus] = useState("");

  if (testers.length === 0) {
    axios.get(Constants.ALL_TESTERS_API_URL).then((response) => {
      setTesters(response.data);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const siteName = formData.get("siteName");
    const address = formData.get("siteAddress");
    const city = formData.get("city");
    const zipCode = formData.get("zipCode");

    // handle corner cases
    if (siteName === "") {
      setAlertStatus("site name");
      return;
    }
    if (address === "") {
      setAlertStatus("address");
      return;
    }
    if (city === "") {
      setAlertStatus("city");
      return;
    }
    if (zipCode === "") {
      setAlertStatus("zip code");
      return;
    }
    if (siteTester === "") {
      setAlertStatus("tester");
      return;
    }
    if (zipCode.length !== 5) {
      setAlertStatus("not valid zip code");
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(zipCode)) {
      setAlertStatus("not valid zip code");
      return;
    }
    const res = await axios.post(Constants.UNIQUE_SITE_API_URL, { siteName });
    if (!res.data.isUnique) {
      setAlertStatus("site name not unique");
      return;
    }

    const form = {
      siteName,
      address,
      city,
      usaState,
      zipCode,
      location,
      siteTester,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.CREATE_SITE_API_URL, { encodedForm })
      .then((response) => {
        if (response.data.success) {
          toast.success("👌 A new testing site is created!");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a Testing Site
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => handleSubmit(event)}
        >
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
                  <MenuItem
                    key={state}
                    value={state}
                    onClick={() => setUsaState(state)}
                  >
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
                  <MenuItem
                    key={locationType}
                    value={locationType}
                    onClick={() => setLocation(locationType)}
                  >
                    {locationType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {testers.length !== 0 && (
              <Grid item xs={12} sm={12}>
                <TextField
                  id="siteTester"
                  select
                  label="Site Tester"
                  fullWidth
                  autoFocus
                  variant="outlined"
                  required
                >
                  {testers.map((tester) => (
                    <MenuItem
                      key={tester[1]}
                      value={tester[1]}
                      onClick={() => setTester(tester[1])}
                    >
                      {tester[0]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
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
          {alertStatus === "site name" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out the site name.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "address" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out the street address.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "city" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out the city.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "zip code" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please fill out the zip code.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "tester" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please select the tester.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "not valid zip code" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>The zip code shall be 5 digits.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "site name not unique" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>The site name is not unique.</AlertTitle>
            </Alert>
          ) : null}
        </form>
      </div>
    </Container>
  );
}
