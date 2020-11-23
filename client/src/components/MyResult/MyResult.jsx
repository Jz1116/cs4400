import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Title from "./components/Title";
import Filter from "./components/Filter";

function createData(id, date, dateProcessed, poolStatus, testStatus) {
  return { id, date, dateProcessed, poolStatus, testStatus };
}

const rows = [
  createData(1, "8/19/20", "8/20/20", "Negative", "Negative"),
  createData(2, "8/24/20", "8/24/20", "Positive", "Negative"),
  createData(3, "8/18/20", "8/28/20", "Positive", "Positive"),
  createData(4, "9/1/20", null, "Pending", "Pending"),
];

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));

export default function MyResult() {
  const classes = useStyles();
  return (
    <>
      <Title>Student View Test Results</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Test ID#</TableCell>
            <TableCell>Timeslot Date</TableCell>
            <TableCell>Date Processed</TableCell>
            <TableCell>Pool Status</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.dateProcessed}</TableCell>
              <TableCell>{row.poolStatus}</TableCell>
              <TableCell>{row.testStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Filter />
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.containerEnd}
      >
        <Grid item sm={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
          >
            Filter
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            fullWidth
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
