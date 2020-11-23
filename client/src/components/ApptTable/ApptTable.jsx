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

function createData(id, date, time, site, location, user) {
  return { id, date, time, site, location, user };
}

const rows = [
  createData(0, "8/17/20", "10:00 am", "Bobby Dodd", "East", "student1"),
  createData(1, "8/17/20", "11:00 am", "Bobby Dodd", "East", ""),
  createData(2, "8/17/20", "12:00 pm", "ECHO", "East", "student2"),
  createData(3, "8/17/20", "1:00 pm", "North Pole", "West", ""),
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

export default function ApptTable() {
  const classes = useStyles();
  return (
    <>
      <Title>View Appointments</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Test Site</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.site}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.user}</TableCell>
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
