import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Title from "./components/Title";

function createData(id, username, name, phoneNumber, sites) {
  return { id, username, name, phoneNumber, sites };
}

const rows = [
  createData(0, "dmcstuffins7", "Doc McStuffins", "1234567890", ["CoC", "CoB"]),
  createData(1, "jdoe381", "Jane Doe", "0987654321", []),
  createData(2, "akarev16", "Alex Karev", "1236547890", ["CRC", "CoC"]),
  createData(3, "sstranger11", "Stephen Strange", "3216540987", ["CoB"]),
];

const sites = ["CoC", "CoB", "CRC"];

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));

export default function ReassignTester() {
  const classes = useStyles();
  return (
    <>
      <Title>Reassign Tester</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Assigned Sites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>
                <Autocomplete
                  multiple
                  id="sites"
                  options={sites}
                  getOptionLabel={(option) => option}
                  defaultValue={row.sites}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
