import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "./components/Title";
import Filter from "./components/Filter";
import * as Constants from "../../Constants";

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));

export default function AggregateResults() {
  const classes = useStyles();
  const [site, setSite] = useState("All");
  const [housing, setHousing] = useState("All");
  const [location, setLocation] = useState("All");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(false);

  // count the number of tests
  const getTotal = (data) => {
    let total = 0;
    data.forEach((row) => {
      total += row.num_of_test;
    });
    return total;
  };

  if (status === false) {
    const form = {
      startDate: null,
      endDate: null,
      site: null,
      housing: null,
      location: null,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.AGGREGATE_RESULT_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setStatus(true);
        setResult(response.data);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const startDate = form.get("startDate");
    const endDate = form.get("endDate");

    const submitForm = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      site: site === "All" ? null : site,
      housing: housing === "All" ? null : housing,
      location: location === "All" ? null : location,
    };
    const encodedForm = JSON.stringify(submitForm);

    axios
      .post(Constants.AGGREGATE_RESULT_API_URL, { encodedForm })
      .then((response) => {
        setResult(response.data);
        toast.success("😊 Data is retrieved successfully!");
      });
  };

  return (
    <>
      <Title>Aggregate Test Results</Title>
      {result.length !== 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{getTotal(result)}</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row) => (
              <TableRow key={row.test_status}>
                <TableCell>{row.test_status}</TableCell>
                <TableCell>{row.num_of_test}</TableCell>
                <TableCell>{row.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <form
        className={classes.form}
        noValidate
        onSubmit={(event) => handleSubmit(event)}
      >
        <Filter
          setLocation={setLocation}
          setHousing={setHousing}
          setSite={setSite}
        />
        <Grid
          container
          spacing={3}
          justify="center"
          className={classes.containerEnd}
        >
          <Grid item sm={2}>
            <Button
              type="submit"
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
      </form>
    </>
  );
}
