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
import { toast } from "react-toastify";
import * as Constants from "../../Constants";

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
  const [site, setSite] = useState("");
  const [sites, setSites] = useState([]);

  if (sites.length === 0) {
    axios.get(Constants.ALL_SITES_API_URL).then((response) => {
      setSite(response.data[0]);
      setSites(response.data);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const date = formData.get("date");
    const time = formData.get("time");

    const form = {
      siteName: site,
      date,
      time,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.CREATE_APPT_API_URL, { encodedForm })
      .then((response) => {
        if (response.data.success) {
          toast.success("🚀 A new appointment is created!");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create an Appointment
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              {sites.length !== 0 && (
                <TextField
                  id="siteName"
                  select
                  label="Site Name"
                  fullWidth
                  autoFocus
                  variant="outlined"
                  required
                  defaultValue={sites[0]}
                >
                  {sites.map((selectedSite) => (
                    <MenuItem
                      key={selectedSite}
                      value={selectedSite}
                      onClick={() => setSite(selectedSite)}
                    >
                      {selectedSite}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                autoComplete="date"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="time"
                label="Time"
                name="time"
                autoComplete="time"
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
            Create Appointment
          </Button>
        </form>
      </div>
    </Container>
  );
}
