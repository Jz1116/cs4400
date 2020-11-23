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

function createData(id, poolId, testIds, dateProcessed, processedBy, status) {
  return { id, poolId, testIds, dateProcessed, processedBy, status };
}

const rows = [
  createData(1, 22332, "1,2,3", "8/18/20", "jim123", "Negative"),
  createData(2, 33443, "4,5,6", "8/25/20", "gburdell1", "Negative"),
  createData(3, 45678, "10,11", "8/28/20", "sasha10", "Positive"),
  createData(4, 54321, "12", null, null, "Pending"),
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

export default function ViewPools() {
  const classes = useStyles();
  return (
    <>
      <Title>View Pools</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pool ID</TableCell>
            <TableCell>Test Ids</TableCell>
            <TableCell>Date Processed</TableCell>
            <TableCell>Processed By</TableCell>
            <TableCell>Pool Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.poolId}</TableCell>
              <TableCell>{row.testIds}</TableCell>
              <TableCell>{row.dateProcessed}</TableCell>
              <TableCell>{row.processedBy}</TableCell>
              <TableCell>{row.status}</TableCell>
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
