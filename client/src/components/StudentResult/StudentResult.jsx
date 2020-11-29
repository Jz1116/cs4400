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
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import * as _ from "lodash";
import Title from "./components/Title";
import Filter from "./components/Filter";
import * as Constants from "../../Constants";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
}));

export default function StudentResult(props) {
  const classes = useStyles();
  const [testStatus, setTestStatus] = useState("All");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(false);
  const [detailMode, setDetailMode] = useState(false);
  const [testResult, setTestResult] = useState([]);
  const [sortApptDate, setSortApptDate] = useState("");
  const [sortProcessDate, setSortProcessDate] = useState("");
  const [sortPoolStatus, setSortPoolStatus] = useState("");
  const [sortTestStatus, setSortTestStatus] = useState("");

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

  const handleTestDetail = (testId) => {
    axios
      .get(`${Constants.STUDENT_RESULT_API_URL}/${testId}`)
      .then((response) => {
        setDetailMode(true);
        setTestResult(response.data);
        if (response.data.length === 0) {
          toast.warn(
            "😥 The test result is not available. Please come back later."
          );
        }
      });
  };

  const closeDetailMode = () => {
    setDetailMode(false);
    setTestResult([]);
  };

  // sort based on column names
  const handleSortApptDate = () => {
    if (sortApptDate === "" || sortApptDate === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(b.date, "M/D/YY").unix() - moment(a.date, "M/D/YY").unix()
      );
      setSortApptDate("descending");
      setResult(updatedResult);
    } else if (sortApptDate === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(a.date, "M/D/YY").unix() - moment(b.date, "M/D/YY").unix()
      );
      setSortApptDate("ascending");
      setResult(updatedResult);
    }
  };

  const handleSortProcessDate = () => {
    if (sortProcessDate === "" || sortProcessDate === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(b.date, "M/D/YY").unix() - moment(a.date, "M/D/YY").unix()
      );
      setSortProcessDate("descending");
      setResult(updatedResult);
    } else if (sortProcessDate === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(a.date, "M/D/YY").unix() - moment(b.date, "M/D/YY").unix()
      );
      setSortProcessDate("ascending");
      setResult(updatedResult);
    }
  };

  const handleSortPoolStatus = () => {
    if (sortPoolStatus === "" || sortPoolStatus === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => b.poolStatus.localeCompare(a.poolStatus));
      setSortPoolStatus("descending");
      setResult(updatedResult);
    } else if (sortPoolStatus === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => a.poolStatus.localeCompare(b.poolStatus));
      setSortPoolStatus("ascending");
      setResult(updatedResult);
    }
  };

  const handleSortTestStatus = () => {
    if (sortTestStatus === "" || sortTestStatus === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => b.testStatus.localeCompare(a.testStatus));
      setSortTestStatus("descending");
      setResult(updatedResult);
    } else if (sortTestStatus === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => a.testStatus.localeCompare(b.testStatus));
      setSortTestStatus("ascending");
      setResult(updatedResult);
    }
  };

  return (
    <>
      {detailMode === false ? (
        <div>
          <Title>Student View Test Results</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test ID#</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleSortApptDate()} size="small">
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Timeslot Date
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleSortProcessDate()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Date Processed
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleSortPoolStatus()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Pool Status
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleSortTestStatus()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            {result.length !== 0 && (
              <TableBody>
                {result.map((row) => (
                  <TableRow key={row.testId}>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleTestDetail(row.testId);
                        }}
                      >
                        {row.testId}
                      </Button>
                    </TableCell>
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
        </div>
      ) : (
        <div>
          <Title>Explore Test Result</Title>
          {testResult.length !== 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID#</TableCell>
                  <TableCell>{testResult[0].testId}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={testResult[0].testDate}>
                  <TableCell>Date Tested</TableCell>
                  <TableCell>{testResult[0].testDate}</TableCell>
                </TableRow>
                <TableRow key={testResult[0].timeslot}>
                  <TableCell>Timeslot</TableCell>
                  <TableCell>{testResult[0].timeslot}</TableCell>
                </TableRow>
                <TableRow key={testResult[0].testingLocation}>
                  <TableCell>Testing Location</TableCell>
                  <TableCell>{testResult[0].testingLocation}</TableCell>
                </TableRow>
                <TableRow key={testResult[0].processDate}>
                  <TableCell>Date Processed</TableCell>
                  <TableCell>{testResult[0].processDate}</TableCell>
                </TableRow>
                <TableRow key={`${testResult[0].poolResult}pool`}>
                  <TableCell>Pool Result</TableCell>
                  <TableCell>{testResult[0].poolResult}</TableCell>
                </TableRow>
                <TableRow key={`${testResult[0].individualResult}test`}>
                  <TableCell>Individual Result</TableCell>
                  <TableCell>{testResult[0].individualResult}</TableCell>
                </TableRow>
                <TableRow key={testResult[0].processedBy}>
                  <TableCell>Processed By</TableCell>
                  <TableCell>{testResult[0].processedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
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
                onClick={() => closeDetailMode()}
                fullWidth
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

StudentResult.propTypes = {
  username: PropTypes.string.isRequired,
};
