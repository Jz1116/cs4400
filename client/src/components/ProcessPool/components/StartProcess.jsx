import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const moment = require("moment");

const statusOptions = ["Positive", "Negative", "Pending"];

function createData(id, dateTested, result) {
  return [id, dateTested, result];
}

const rows = [
  createData(1, "8/17/20", "Pending"),
  createData(2, "8/24/20", "Pending"),
  createData(3, "8/28/20", "Pending"),
  createData(4, "9/1/20", "Pending"),
];

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

export default function SelectPool() {
  const [poolStatus, setPoolStatus] = useState("");
  const classes = useStyles();

  const handlePoolStatus = (status) => {
    setPoolStatus(status);

    if (status === "Positive") {
      rows.forEach((row, idx) => {
        rows[idx][2] = "Pending";
      });
    } else if (status === "Negative") {
      rows.forEach((row, idx) => {
        rows[idx][2] = "Negative";
      });
    }
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Typography variant="body1">Pool ID:</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">11222</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">Date Processed:</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{moment().format("l")}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">Pool Status:</Typography>
        </Grid>
        <Grid item sm={12}>
          <ButtonGroup color="primary" fullWidth>
            <Button onClick={() => handlePoolStatus("Positive")}>
              Positive
            </Button>
            <Button onClick={() => handlePoolStatus("Negative")}>
              Negative
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item sm={12}>
          {poolStatus === "Negative" && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID#</TableCell>
                  <TableCell>Date Tested</TableCell>
                  <TableCell>Test Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {poolStatus === "Positive" && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID#</TableCell>
                  <TableCell>Date Tested</TableCell>
                  <TableCell>Test Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>
                      <TextField
                        id="poolStatus"
                        select
                        fullWidth
                        autoFocus
                        variant="outlined"
                        defaultValue="All"
                        size="small"
                      >
                        {statusOptions.map((statusOption) => (
                          <MenuItem key={statusOption} value={statusOption}>
                            {statusOption}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Process Pool
      </Button>
    </form>
  );
}
