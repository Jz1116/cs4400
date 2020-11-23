import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

export default function SelectPool(props) {
  const classes = useStyles();
  const { pools } = props;

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            id="pool"
            select
            label="Select Pool"
            fullWidth
            autoFocus
            variant="outlined"
            required
            defaultValue={pools[0]}
          >
            {pools.map((pool) => (
              <MenuItem key={pool} value={pool}>
                {pool}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={5} />
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => props.setSelected(true)}
      >
        Next
      </Button>
    </form>
  );
}
