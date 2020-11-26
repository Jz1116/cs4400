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

export default function MyProcessedTests(props) {
  const classes = useStyles();
  const [testStatus, setTestStatus] = useState("All");
  const [tests, setTests] = useState([]);
  const [status, setStatus] = useState(false);

  const initializeTests = () => {
    const form = {
      startDate: null,
      endDate: null,
      username: props.username,
      testStatus: null,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.LABTECH_TESTS_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setStatus(true);
        setTests(response.data);
      });
  };

  if (status === false) {
    initializeTests();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const form = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      testStatus: testStatus === "All" ? null : testStatus,
      username: props.username,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.LABTECH_TESTS_API_URL, { encodedForm })
      .then((response) => {
        setTests(response.data);
        toast.success("🤓️ Tests are retrieved successfully!");
      });
  };

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
        {tests.length !== 0 && (
          <TableBody>
            {tests.map((row) => (
              <TableRow key={row.testId}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row.poolId}</TableCell>
                <TableCell>{row.testDate}</TableCell>
                <TableCell>{row.processDate}</TableCell>
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
              onClick={() => initializeTests()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
