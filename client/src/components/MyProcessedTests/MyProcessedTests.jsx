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

function createData(id, poolId, dateTested, dateProcessed, result) {
  return { id, poolId, dateTested, dateProcessed, result };
}

const rows = [
  createData(1, 22332, "8/17/20", "8/29/20", "Negative"),
  createData(2, 22332, "8/24/20", "8/29/20", "Positive"),
  createData(3, 22332, "8/28/20", "8/29/20", "Positive"),
  createData(4, 44554, "9/1/20", "9/1/20", "Positive"),
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

export default function MyProcessedTests() {
  const classes = useStyles();
  return (
    <>
      <Title>Lab Tech Tests Processed</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Test ID#</TableCell>
            <TableCell>Pool ID</TableCell>
            <TableCell>Date Tested</TableCell>
            <TableCell>Date Processed</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.poolId}</TableCell>
              <TableCell>{row.dateTested}</TableCell>
              <TableCell>{row.dateProcessed}</TableCell>
              <TableCell>{row.result}</TableCell>
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
