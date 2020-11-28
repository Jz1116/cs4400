import React, { useState } from "react";
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
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import axios from "axios";
import { toast } from "react-toastify";
import * as Constants from "../../Constants";

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
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
  },
  inputLabelPadding: {
    paddingTop: theme.spacing(1),
  },
}));

export default function CreatePool() {
  const classes = useStyles();
  const [tests, setTests] = useState([]);
  const [getTest, setGetTest] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");

  if (getTest === false) {
    axios.get(Constants.ALL_TESTS_API_URL).then((response) => {
      if (response.data.length === 0) {
        toast.error("😢 There is no pending tests. Please come back later.");
      } else {
        setTests(response.data);
      }
      setGetTest(true);
    });
  }

  const handleChange = (testId, event) => {
    const selectedTest = tests.find((test) => test.testId === testId);
    selectedTest.checked = event.target.checked;
    setTests(tests);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const poolId = formData.get("poolId");
    const selectedTests = [];
    tests.forEach((test) => {
      if (test.checked) {
        selectedTests.push(test.testId);
      }
    });

    if (poolId.length === 0) {
      setAlertStatus("poolId");
      return;
    }
    if (selectedTests.length === 0) {
      setAlertStatus("selected tests");
      return;
    }
    const res = await axios.get(`${Constants.POOL_API_URL}/${poolId}`);
    if (res.data.hasPool) {
      setAlertStatus("pool not unique");
      return;
    }

    const form = {
      poolId,
      selectedTests,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.CREATE_POOL_API_URL, { encodedForm })
      .then((response) => {
        if (response.data.success) {
          toast.success("😊 A new pool is created!");
        }
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a Pool
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <InputLabel className={classes.inputLabelPadding}>
                Pool ID:
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="poolId"
                name="poolId"
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
                {tests.length !== 0 && (
                  <TableBody>
                    {tests.map((test) => (
                      <TableRow key={test.testId}>
                        <TableCell>{test.testId}</TableCell>
                        <TableCell>{test.date}</TableCell>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            onChange={(e) => handleChange(test.testId, e)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
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
          {alertStatus === "poolId" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please enter the pool id.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "selected tests" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>Please select the tests.</AlertTitle>
            </Alert>
          ) : null}
          {alertStatus === "pool not unique" ? (
            <Alert severity="warning" onClose={() => setAlertStatus("")}>
              <AlertTitle>The pool id is not unique.</AlertTitle>
            </Alert>
          ) : null}
        </form>
      </div>
    </Container>
  );
}
