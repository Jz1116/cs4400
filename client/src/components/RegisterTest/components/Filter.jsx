import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";

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
  gridItemPadding: {
    paddingTop: theme.spacing(3),
  },
  labelPadding: {
    paddingBottom: theme.spacing(1),
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3} className={classes.containerStart}>
        <Grid item xs={6} sm={4}>
          <InputLabel className={classes.labelPadding}>Testing Site</InputLabel>
          <TextField
            id="testing-site"
            select
            fullWidth
            autoFocus
            variant="outlined"
            defaultValue="All"
          >
            {props.sites.map((site) => (
              <MenuItem
                key={site}
                value={site}
                onClick={() => props.setSiteName(site)}
              >
                {site}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2} sm={2}>
          <InputLabel className={classes.labelPadding}>Date</InputLabel>
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
        <Grid item xs={2} sm={2}>
          <InputLabel className={classes.labelPadding}>Time</InputLabel>
          <TextField
            autoComplete="sTime"
            name="startTime"
            variant="outlined"
            fullWidth
            id="startTime"
            label="Start Time"
            autoFocus
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <div className={classes.gridItemPadding}>
            <TextField
              variant="outlined"
              fullWidth
              id="endTime"
              label="End Time"
              name="endTime"
              autoComplete="eTime"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

Filter.propTypes = {
  setSiteName: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sites: PropTypes.array.isRequired,
};
