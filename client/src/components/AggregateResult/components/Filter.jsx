import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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

const siteTypes = [
  { value: "CRC", label: "CRC" },
  { value: "CoC", label: "CoC" },
  { value: "CoB", label: "CoB" },
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
}));

export default function Filter() {
  const classes = useStyles();
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
              <MenuItem key={housingType.value} value={`${housingType.value}`}>
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
            {siteTypes.map((siteType) => (
              <MenuItem key={siteType.value} value={`${siteType.value}`}>
                {siteType.label}
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
          <TextField
            variant="outlined"
            fullWidth
            id="endDate"
            label="End Date"
            name="endDate"
            autoComplete="edate"
          />
        </Grid>
      </Grid>
    </>
  );
}
