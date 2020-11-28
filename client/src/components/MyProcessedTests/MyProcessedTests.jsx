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
import IconButton from "@material-ui/core/IconButton";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import * as _ from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
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

export default function MyProcessedTests(props) {
  const classes = useStyles();
  const [testStatus, setTestStatus] = useState("All");
  const [tests, setTests] = useState([]);
  const [status, setStatus] = useState(false);
  const [detailMode, setDetailMode] = useState(false);
  const [poolResult, setPoolResult] = useState([]);
  const [poolTests, setPoolTests] = useState([]);
  const [sortDateTested, setSortDateTested] = useState("");
  const [sortDateProcessed, setSortDateProcessed] = useState("");
  const [sortResult, setSortResult] = useState("");

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

  const handlePoolDetail = (poolId) => {
    axios.get(`${Constants.POOL_DATA_API_URL}/${poolId}`).then((response) => {
      setDetailMode(true);
      setPoolResult(response.data);
      if (response.data.length === 0) {
        toast.warn(
          "😥 The pool result is not available. Please come back later."
        );
        setPoolTests([]);
      } else {
        axios.get(`${Constants.POOL_TESTS_API_URL}/${poolId}`).then((res) => {
          setPoolTests(res.data);
        });
      }
    });
  };

  // sort corresponding to columns
  const handleSortDateTested = () => {
    if (sortDateTested === "" || sortDateTested === "ascending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort(
        (a, b) =>
          moment(b.testDate, "M/D/YY").unix() -
          moment(a.testDate, "M/D/YY").unix()
      );
      setSortDateTested("descending");
      setTests(updatedTests);
    } else if (sortDateTested === "descending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort(
        (a, b) =>
          moment(a.testDate, "M/D/YY").unix() -
          moment(b.testDate, "M/D/YY").unix()
      );
      setSortDateTested("ascending");
      setTests(updatedTests);
    }
  };

  const handleSortDateProcessed = () => {
    if (sortDateProcessed === "" || sortDateProcessed === "ascending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort(
        (a, b) =>
          moment(b.processDate, "M/D/YY").unix() -
          moment(a.processDate, "M/D/YY").unix()
      );
      setSortDateProcessed("descending");
      setTests(updatedTests);
    } else if (sortDateProcessed === "descending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort(
        (a, b) =>
          moment(a.processDate, "M/D/YY").unix() -
          moment(b.processDate, "M/D/YY").unix()
      );
      setSortDateProcessed("ascending");
      setTests(updatedTests);
    }
  };

  const handleSortResult = () => {
    if (sortResult === "" || sortResult === "ascending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort((a, b) => a.testStatus.localeCompare(b.testStatus));
      setSortResult("descending");
      setTests(updatedTests);
    } else if (sortResult === "descending") {
      const updatedTests = _.cloneDeep(tests);
      updatedTests.sort((a, b) => b.testStatus.localeCompare(a.testStatus));
      setSortResult("ascending");
      setTests(updatedTests);
    }
  };

  return (
    <>
      {detailMode === false ? (
        <>
          <Title>Lab Tech Tests Processed</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test ID#</TableCell>
                <TableCell>Pool ID</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleSortDateTested()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Date Tested
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleSortDateProcessed()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Date Processed
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleSortResult()} size="small">
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Result
                </TableCell>
              </TableRow>
            </TableHead>
            {tests.length !== 0 && (
              <TableBody>
                {tests.map((row) => (
                  <TableRow key={row.testId}>
                    <TableCell>{row.testId}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handlePoolDetail(row.poolId);
                        }}
                      >
                        {row.poolId}
                      </Button>
                    </TableCell>
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
      ) : (
        <>
          <Title>Explore Pool Result</Title>
          {poolResult.length !== 0 && (
            <>
              <Title>Pool Metadata</Title>
              <Table>
                <TableHead>
                  <TableRow key={poolResult[0].poolId}>
                    <TableCell>Pool ID#</TableCell>
                    <TableCell>{poolResult[0].poolId}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={poolResult[0].dateProcessed}>
                    <TableCell>Date Processed</TableCell>
                    <TableCell>{poolResult[0].dateProcessed}</TableCell>
                  </TableRow>
                  <TableRow key={poolResult[0].processedBy}>
                    <TableCell>Processed By</TableCell>
                    <TableCell>{poolResult[0].processedBy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
          <br />
          {poolTests.length !== 0 && (
            <>
              <Title>Tests In Pool</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test ID#</TableCell>
                    <TableCell>Date Tested</TableCell>
                    <TableCell>Testing Site</TableCell>
                    <TableCell>Test Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poolTests.map((row) => (
                    <TableRow key={row.testId}>
                      <TableCell>{row.testId}</TableCell>
                      <TableCell>{row.dateTested}</TableCell>
                      <TableCell>{row.siteName}</TableCell>
                      <TableCell>{row.testResult}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
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
                onClick={() => setDetailMode(false)}
                fullWidth
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

MyProcessedTests.propTypes = {
  username: PropTypes.string.isRequired,
};
