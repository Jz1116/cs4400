import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Title from "./components/Title";
import Filter from "./components/Filter";

function createData(id, date, time, address, site, clicked) {
  return { id, date, time, address, site, clicked };
}

const rows = [
  createData(0, "8/17/20", "10:00 am", "169 5th St", "Bobby Dodd", false),
  createData(1, "8/17/20", "11:00 am", "169 5th St", "Bobby Dodd", true),
  createData(2, "8/17/20", "12:00 pm", "1 Techwood Dr", "ECHO", false),
  createData(3, "8/17/20", "1:00 pm", "543 Northpole", "North Pole", false),
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

export default function RegisterTest() {
  const classes = useStyles();
  return (
    <>
      <Title>Sign up for a Test</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Site Address</TableCell>
            <TableCell>Test Site</TableCell>
            <TableCell>Signup</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.site}</TableCell>
              <TableCell>
                <Radio checked={row.clicked} />
              </TableCell>
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
            variant="outlined"
            color="primary"
            className={classes.button}
            fullWidth
          >
            Filter
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            variant="outlined"
            color="default"
            className={classes.button}
            fullWidth
          >
            Reset
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
