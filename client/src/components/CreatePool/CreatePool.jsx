import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { InputLabel } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

function createData(id, dateTested, isIncluded) {
  return { id, dateTested, isIncluded };
}

const rows = [
  createData(1, "8/17/20", true),
  createData(2, "8/17/20", true),
  createData(3, "8/18/20", true),
  createData(4, "8/20/20", true),
  createData(5, "8/24/20", false),
  createData(6, "8/28/20", false),
  createData(7, "9/1/20", false),
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
  inputLabelPadding: {
    paddingTop: theme.spacing(1),
  },
}));

export default function CreatePool() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a Pool
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <InputLabel className={classes.inputLabelPadding}>
                Pool ID:
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="poolID"
                fullWidth
                autoFocus
                variant="outlined"
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test ID#</TableCell>
                    <TableCell>Date Tested</TableCell>
                    <TableCell>Include in Pool</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.dateTested}</TableCell>
                      <TableCell>
                        <Checkbox color="primary" checked={row.isIncluded} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Pool
          </Button>
        </form>
      </div>
    </Container>
  );
}
