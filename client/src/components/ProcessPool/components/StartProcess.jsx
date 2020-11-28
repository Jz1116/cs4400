import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import * as Constants from "../../../Constants";

const statusOptions = [
  {
    value: "positive",
    label: "Positive",
  },
  {
    value: "negative",
    label: "Negative",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
  },
  buttonLowerText: {
    textTransform: "none",
  },
}));

export default function SelectPool(props) {
  const classes = useStyles();
  const [poolStatus, setPoolStatus] = useState("");
  const [tests, setTests] = useState([]);
  const [status, setStatus] = useState(false);

  if (status === false) {
    axios.get(`${Constants.TEST_API_URL}/${props.poolId}`).then((response) => {
      setTests(response.data);
      setStatus(true);
    });
  }

  const handlePoolStatus = (status) => {
    setPoolStatus(status);

    if (status === "negative") {
      const updatedTests = tests.map((test) => {
        return {
          testId: test.testId,
          dateTested: test.dateTested,
          testResult: "negative",
        };
      });
      setTests(updatedTests);
    } else if (status === "positive") {
      const updatedTests = tests.map((test) => {
        return {
          testId: test.testId,
          dateTested: test.dateTested,
          testResult: "pending",
        };
      });
      setTests(updatedTests);
    }
  };

  const handleTest = (testId, testStatus) => {
    const selectedTest = tests.find((test) => test.testId === testId);
    selectedTest.testResult = testStatus;
    setTests(tests);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const processDate = formData.get("processDate");

    const poolForm = {
      poolId: props.poolId,
      poolStatus,
      processDate,
      processedBy: props.username,
    };
    const encodedPoolForm = JSON.stringify(poolForm);

    axios
      .post(Constants.PROCESS_POOL_API_URL, { encodedPoolForm })
      .then((response) => {
        if (response.data.success) {
          tests.forEach((test) => {
            const testForm = {
              testId: test.testId,
              testStatus: test.testResult,
            };

            const encodedTestForm = JSON.stringify(testForm);
            axios.post(Constants.PROCESS_TEST_API_URL, { encodedTestForm });
          });
          toast.success("😎 The pool is processed successfully!");
        }
      });
  };

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(event) => handleSubmit(event)}
    >
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Typography variant="body1">Pool ID:</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{props.poolId}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">Date Processed:</Typography>
        </Grid>
        <Grid item sm={6}>
          <TextField
            autoComplete="pdate"
            name="processDate"
            variant="outlined"
            fullWidth
            id="processDate"
            autoFocus
            size="small"
          />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">Pool Status:</Typography>
        </Grid>
        <Grid item sm={12}>
          <ButtonGroup color="primary" fullWidth>
            <Button onClick={() => handlePoolStatus("positive")}>
              Positive
            </Button>
            <Button onClick={() => handlePoolStatus("negative")}>
              Negative
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item sm={12}>
          {poolStatus === "negative" && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID#</TableCell>
                  <TableCell>Date Tested</TableCell>
                  <TableCell>Test Result</TableCell>
                </TableRow>
              </TableHead>
              {status && (
                <TableBody>
                  {tests.map((row) => (
                    <TableRow key={row.testId}>
                      <TableCell>{row.testId}</TableCell>
                      <TableCell>{row.dateTested}</TableCell>
                      <TableCell>{row.testResult}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          )}
          {poolStatus === "positive" && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID#</TableCell>
                  <TableCell>Date Tested</TableCell>
                  <TableCell>Test Result</TableCell>
                </TableRow>
              </TableHead>
              {status && (
                <TableBody>
                  {tests.map((row) => (
                    <TableRow key={row.testId}>
                      <TableCell>{row.testId}</TableCell>
                      <TableCell>{row.dateTested}</TableCell>
                      <TableCell>
                        <TextField
                          id="poolStatus"
                          select
                          fullWidth
                          autoFocus
                          variant="outlined"
                          defaultValue={row.testResult}
                          size="small"
                        >
                          {statusOptions.map((statusOption) => (
                            <MenuItem
                              onClick={() =>
                                // eslint-disable-next-line prettier/prettier
                                handleTest(row.testId, statusOption.value)}
                              key={statusOption.label}
                              value={statusOption.value}
                            >
                              {statusOption.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          )}
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Process Pool
      </Button>
      <Button
        variant="outlined"
        color="default"
        onClick={() => props.setSelected(false)}
        className={classes.buttonLowerText}
        fullWidth
      >
        Back
      </Button>
    </form>
  );
}
