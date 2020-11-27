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

export default function ViewPools() {
  const classes = useStyles();
  const [poolStatus, setPoolStatus] = useState("All");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState(false);
  const [detailMode, setDetailMode] = useState(false);
  const [poolResult, setPoolResult] = useState([]);
  const [poolTests, setPoolTests] = useState([]);

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
                <TableCell>Date Processed</TableCell>
                <TableCell>Processed By</TableCell>
                <TableCell>Pool Status</TableCell>
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
