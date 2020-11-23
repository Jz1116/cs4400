import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const sites = ["CRC", "CoC", "CoB", "All"];

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
  group: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
}));

export default function Filter() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3} className={classes.containerStart}>
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
              <MenuItem key={site} value={site}>
                {site}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
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
        <Grid item xs={2} sm={2}>
          <TextField
            autoComplete="stime"
            name="startTime"
            variant="outlined"
            fullWidth
            id="startTime"
            label="Start Time"
            autoFocus
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            variant="outlined"
            fullWidth
            id="endTime"
            label="End Time"
            name="endTime"
            autoComplete="eTime"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.containerMid}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" className={classes.containerMid}>
            Availability
          </FormLabel>
          <RadioGroup className={classes.group} defaultValue="Show all">
            <FormControlLabel
              value="Show all"
              control={<Radio />}
              label="Show all"
            />
            <FormControlLabel
              value="Show available only"
              control={<Radio />}
              label="Show available only"
            />
            <FormControlLabel
              value="Show booked only"
              control={<Radio />}
              label="Show booked only"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}
