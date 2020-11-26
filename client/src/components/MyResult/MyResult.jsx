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

export default function MyResult(props) {
  const classes = useStyles();
  const [testStatus, setTestStatus] = useState("All");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(false);

  const initializeResult = () => {
    const form = {
      startDate: null,
      endDate: null,
      username: props.username,
      status: null,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.STUDENT_RESULT_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setStatus(true);
        setResult(response.data);
      });
  };

  if (status === false) {
    initializeResult();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const form = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      status: testStatus === "All" ? null : testStatus,
      username: props.username,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.STUDENT_RESULT_API_URL, { encodedForm })
      .then((response) => {
        setResult(response.data);
        toast.success("😆 Result is retrieved successfully!");
      });
  };

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
        {result.length !== 0 && (
          <TableBody>
            {result.map((row) => (
              <TableRow key={row.testId}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.dateProcessed}</TableCell>
                <TableCell>{row.poolStatus}</TableCell>
                <TableCell>{row.testStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <form
        className={classes.form}
        noValidate
        onSubmit={(event) => handleSubmit(event)}
      >
        <Filter setTestStatus={setTestStatus} />
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
              onClick={() => initializeResult()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
