import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";

const statusOptions = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "positive",
    label: "Positive",
  },
  {
    value: "negative",
    label: "Negative",
  },
  {
    value: "pending",
    label: "Pending",
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
  return (
    <>
      <Grid container spacing={3} className={classes.containerStart}>
        <Grid item xs={6} sm={4}>
          <InputLabel className={classes.labelPadding}>Test Result</InputLabel>
          <TextField
            id="testStatus"
            select
            fullWidth
            autoFocus
            variant="outlined"
            defaultValue="All"
          >
            {statusOptions.map((statusOption) => (
              <MenuItem
                key={statusOption.label}
                value={statusOption.value}
                onClick={() => props.setTestStatus(statusOption.value)}
              >
                {statusOption.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2} sm={2}>
          <InputLabel className={classes.labelPadding}>Date Tested</InputLabel>
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
              name="endDate"
              autoComplete="edate"
              label="End Date"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

Filter.propTypes = {
  setTestStatus: PropTypes.func.isRequired,
};
