import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./components/Title";

function createData(id, date, testsProcessed, positiveCount, positivePercent) {
  return { id, date, testsProcessed, positiveCount, positivePercent };
}

const rows = [
  createData(0, "9/1/20", 100, 5, "5.00%"),
  createData(1, "9/2/20", 200, 10, "5.00%"),
  createData(2, "9/3/20", 100, 10, "10.00%"),
  createData(3, "9/7/20", 400, 20, "5.00%"),
  createData(4, "9/10/20", 100, 8, "8.00%"),
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

export default function DailyResult() {
  const classes = useStyles();
  return (
    <>
      <Title>View Daily Results</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Tests Processed</TableCell>
            <TableCell>Positive Count</TableCell>
            <TableCell>Positive Percent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.testsProcessed}</TableCell>
              <TableCell>{row.positiveCount}</TableCell>
              <TableCell>{row.positivePercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
