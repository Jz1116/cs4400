import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import * as Constants from "../../../Constants";

const locationTypes = [
  {
    value: "East",
    label: "East",
  },
  {
    value: "West",
    label: "West",
  },
  {
    value: "All",
    label: "All",
  },
];

const housingTypes = [
  { value: "Student Housing", label: "Student Housing" },
  { value: "Greek Housing", label: "Greek Housing" },
  { value: "Off-campus House", label: "Off-Campus House" },
  { value: "Off-campus Apartment", label: "Off-Campus Apartments" },
  {
    value: "All",
    label: "All",
  },
];

const useStyles = makeStyles((theme) => ({
  containerStart: {
    paddingTop: theme.spacing(4),
  },
  containerMid: {
    paddingTop: theme.spacing(2),
  },
  center: {
    textAlign: "center",
  },
  labelPadding: {
    paddingBottom: theme.spacing(1),
  },
  gridItemPadding: {
    paddingTop: theme.spacing(3),
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const [sites, setSites] = useState([]);

  if (sites.length === 0) {
    axios.get(Constants.ALL_SITES_API_URL).then((response) => {
      const siteData = response.data;
      siteData.push("All");
      setSites(siteData);
    });
  }

  return (
    <>
      <Grid container spacing={3} className={classes.containerStart}>
        <Grid item xs={6} sm={4}>
          <TextField
            id="location"
            select
            label="Location"
            fullWidth
            autoFocus
            variant="outlined"
            defaultValue="All"
          >
            {locationTypes.map((locationType) => (
              <MenuItem
                key={locationType.value}
                value={`${locationType.value}`}
                onClick={() => props.setLocation(locationType.value)}
              >
                {locationType.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="housing-type"
            select
            label="Housing"
            fullWidth
            autoFocus
            variant="outlined"
            defaultValue="All"
          >
            {housingTypes.map((housingType) => (
              <MenuItem
                key={housingType.value}
                value={`${housingType.value}`}
                onClick={() => props.setHousing(housingType.value)}
              >
                {housingType.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="testing-site"
            select
            label="Testing Site"
            fullWidth
            autoFocus
            variant="outlined"
            defaultValue="All"
          >
            {sites.map((site) => (
              <MenuItem
                key={site}
                value={site}
                onClick={() => props.setSite(site)}
              >
                {site}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.containerMid}
      >
        <Grid item xs={2} sm={2}>
          <InputLabel className={classes.labelPadding}>
            Date Processed
          </InputLabel>
          <TextField
            autoComplete="sdate"
            name="startDate"
            variant="outlined"
            fullWidth
            id="startDate"
            label="Start Date"
            autoFocus
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <div className={classes.gridItemPadding}>
            <TextField
              variant="outlined"
              fullWidth
              id="endDate"
              label="End Date"
              name="endDate"
              autoComplete="edate"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

Filter.propTypes = {
  setSite: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setHousing: PropTypes.func.isRequired,
};
