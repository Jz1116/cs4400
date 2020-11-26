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

  return (
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
                <TableCell>{row.poolId}</TableCell>
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
  );
}
