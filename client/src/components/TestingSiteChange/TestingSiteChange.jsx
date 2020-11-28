import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Constants from "../../Constants";

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
    margin: theme.spacing(3, 0, 6),
    textTransform: "none",
  },
}));

export default function TestingSiteChange(props) {
  const classes = useStyles();
  const { username } = props;
  const [fullName, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [sites, setSites] = useState([]);
  const [assignedSites, setAssignedSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);

  if (status === false) {
    axios
      .get(`${Constants.TESTER_API_URL}/${props.username}`)
      .then((response) => {
        setName(response.data.full_name);
      });

    axios.get(Constants.ALL_SITES_API_URL).then((response) => {
      setSites(response.data);
    });

    axios
      .get(`${Constants.TESTER_API_URL}/${props.username}/sites`)
      .then((response) => {
        setAssignedSites(response.data);
        setStatus(true);
      });
  }

  const handleUpdate = () => {
    const originalSet = new Set(assignedSites);
    const newSet = new Set(selectedSites);

    const addedSites = [];
    const deletedSites = [];

    assignedSites.forEach((site) => {
      if (!newSet.has(site)) {
        deletedSites.push(site);
      }
    });

    selectedSites.forEach((site) => {
      if (!originalSet.has(site)) {
        addedSites.push(site);
      }
    });

    addedSites.forEach((site) => {
      const form = { username: props.username, siteName: site };
      const encodedForm = JSON.stringify(form);
      axios.post(Constants.ASSIGN_TESTER_API_URL, { encodedForm });
    });

    deletedSites.forEach((site) => {
      const form = { username: props.username, siteName: site };
      const encodedForm = JSON.stringify(form);
      axios.post(Constants.UNASSIGN_TESTER_API_URL, { encodedForm });
    });
    setAssignedSites(selectedSites);
    toast.success("😏 The assigned sites are updated!");
  };

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
            {status && (
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  multiple
                  id="sites"
                  options={sites}
                  getOptionLabel={(option) => option}
                  defaultValue={assignedSites}
                  onChange={(event, value) => setSelectedSites(value)}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <TextField {...params} variant="standard" />
                  )}
                />
              </Grid>
            )}
          </Grid>
          <Button
            onClick={() => handleUpdate()}
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

TestingSiteChange.propTypes = {
  username: PropTypes.string.isRequired,
};
