import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import * as Constants from "../../../Constants";

const useStyles = makeStyles((theme) => ({
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
  const [pools, setPools] = useState([]);
  const [status, setStatus] = useState(false);

  if (status === false) {
    axios.get(Constants.ALL_PENDING_POOLS_API_URL).then((response) => {
      setPools(response.data);
      if (response.data.length === 0)
        toast.warn("😫 There are no pending pools.");
    });
    setStatus(true);
  }

  return (
    <form className={classes.form} noValidate>
      {status && (
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
            >
              {pools.map((pool) => (
                <MenuItem
                  key={pool}
                  value={pool}
                  onClick={() => props.setPoolId(pool)}
                >
                  {pool}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={5} />
        </Grid>
      )}
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
