import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import * as _ from "lodash";
import axios from "axios";
import { toast } from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import Title from "./components/Title";
import Filter from "./components/Filter";
import * as Constants from "../../Constants";
import StartProcess from "../ProcessPool/components/StartProcess";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  containerEnd: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    textTransform: "none",
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function ViewPools(props) {
  const classes = useStyles();
  const { username } = props;
  const [poolStatus, setPoolStatus] = useState("All");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState(false);
  const [detailMode, setDetailMode] = useState(false);
  const [poolResult, setPoolResult] = useState([]);
  const [poolTests, setPoolTests] = useState([]);
  const [selectedPoolId, setSelectedPoolId] = useState("");
  const [sortProcessDate, setSortProcessDate] = useState("");
  const [sortProcessedBy, setSortProcessedBy] = useState("");
  const [sortPoolStatus, setSortPoolStatus] = useState("");

  const initializePool = () => {
    const form = {
      startDate: null,
      endDate: null,
      status: null,
      processedBy: null,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.POOL_RESULT_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setStatus(true);
        setResult(response.data);
      });
  };

  if (status === false) {
    initializePool();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const startDate = form.get("startDate");
    const endDate = form.get("endDate");
    const processedBy = form.get("processedBy");

    const submitForm = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      processedBy: processedBy === "" ? null : processedBy,
      status: poolStatus === "All" ? null : poolStatus,
    };
    const encodedForm = JSON.stringify(submitForm);

    axios
      .post(Constants.POOL_RESULT_API_URL, { encodedForm })
      .then((response) => {
        setResult(response.data);
        toast.success("🤗️ Pools are retrieved successfully!");
      });
  };

  const handlePoolDetail = (poolId) => {
    setSelectedPoolId(poolId);
    axios.get(`${Constants.POOL_DATA_API_URL}/${poolId}`).then((response) => {
      setDetailMode(true);
      setPoolResult(response.data);
      if (response.data.length === 0) {
        setPoolTests([]);
      } else {
        axios.get(`${Constants.POOL_TESTS_API_URL}/${poolId}`).then((res) => {
          setPoolTests(res.data);
        });
      }
    });
  };

  const closeDetailMode = () => {
    setDetailMode(false);
    setSelectedPoolId("");
  };

  // sort based on column names
  const handleSortProcessDate = () => {
    if (sortProcessDate === "" || sortProcessDate === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(b.dateProcessed, "M/D/YY").unix() -
          moment(a.dateProcessed, "M/D/YY").unix()
      );
      setSortProcessDate("descending");
      setResult(updatedResult);
    } else if (sortProcessDate === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort(
        (a, b) =>
          moment(a.dateProcessed, "M/D/YY").unix() -
          moment(b.dateProcessed, "M/D/YY").unix()
      );
      setSortProcessDate("ascending");
      setResult(updatedResult);
    }
  };

  const handleSortProcessedBy = () => {
    if (sortProcessedBy === "" || sortProcessedBy === "ascending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => {
        if (a.processedBy === null) {
          return 1;
        }
        if (b.processedBy === null) {
          return -1;
        }
        return b.processedBy.localeCompare(a.processedBy);
      });
      setSortProcessedBy("descending");
      setResult(updatedResult);
    } else if (sortProcessedBy === "descending") {
      const updatedResult = _.cloneDeep(result);
      updatedResult.sort((a, b) => {
        if (a.processedBy === null) {
          return -1;
        }
        if (b.processedBy === null) {
          return 1;
        }
        return a.processedBy.localeCompare(b.processedBy);
      });
      setSortProcessedBy("ascending");
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

  return (
    <>
      {detailMode === false ? (
        <>
          <Title>View Pools</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pool ID</TableCell>
                <TableCell>Test Ids</TableCell>
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
                    onClick={() => handleSortProcessedBy()}
                    size="small"
                  >
                    <UnfoldMoreIcon fontSize="small" />
                  </IconButton>
                  Processed By
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
              </TableRow>
            </TableHead>
            {result.length !== 0 && (
              <TableBody>
                {result.map((row) => (
                  <TableRow key={row.poolId}>
                    <Button
                      onClick={() => {
                        handlePoolDetail(row.poolId);
                      }}
                    >
                      {row.poolId}
                    </Button>
                    <TableCell>{row.testIds}</TableCell>
                    <TableCell>{row.dateProcessed}</TableCell>
                    <TableCell>{row.processedBy}</TableCell>
                    <TableCell>{row.poolStatus}</TableCell>
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
            <Filter setPoolStatus={setPoolStatus} />
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
                  onClick={() => initializePool()}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <>
          {poolResult.length === 0 && (
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Process Pool
                </Typography>
                <StartProcess
                  username={username}
                  poolId={selectedPoolId}
                  disableButton
                />
              </div>
            </Container>
          )}
          {poolResult.length !== 0 && (
            <>
              <Title>Explore Pool Result</Title>
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
                onClick={() => closeDetailMode()}
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

ViewPools.propTypes = {
  username: PropTypes.string.isRequired,
};
