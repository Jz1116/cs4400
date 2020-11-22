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

function createData(id, type, num, percent) {
  return { id, type, num, percent };
}

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));

const rows = [
  createData(0, "Positive", 450, "6.43%"),
  createData(1, "Negative", 6550, "93.57%"),
  createData(3, "Pending", 0, "0%"),
];

export default function Orders() {
  const classes = useStyles();
  return (
    <>
      <Title>Aggregate Test Results</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>7000</TableCell>
            <TableCell>100%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell>{row.percent}</TableCell>
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
