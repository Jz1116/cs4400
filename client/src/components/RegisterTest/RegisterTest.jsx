import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function RegisterTest(props) {
  const classes = useStyles();
  const [appts, setAppts] = useState([]);
  const [siteName, setSiteName] = useState("All");
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState(false);

  const initializeAppts = () => {
    const form = {
      username: props.username,
      siteName: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    };

    const encodedForm = JSON.stringify(form);

    axios
      .post(Constants.STUDENT_APPTS_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setAppts(response.data);
        const set = new Set();
        response.data.forEach((appt) => {
          set.add(appt.siteName);
        });
        set.add("All");
        setSites([...set]);
      });
  };

  if (status === false) {
    initializeAppts();
    setStatus(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    const form = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      startTime: startTime === "" ? null : startTime,
      endTime: endTime === "" ? null : endTime,
      username: props.username,
      siteName: siteName === "All" ? null : siteName,
    };

    const encodedForm = JSON.stringify(form);

    axios
      .post(Constants.STUDENT_APPTS_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setAppts(response.data);
        toast.success("👏 Appointments are retrieved successfully!");
      });
  };

  return (
    <>
      <Title>Sign up for a Test</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Site Address</TableCell>
            <TableCell>Test Site</TableCell>
            <TableCell>Signup</TableCell>
          </TableRow>
        </TableHead>
        {status && (
          <TableBody>
            {appts.map((row) => (
              <TableRow key={`${row.date} ${row.time} ${row.siteName}`}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.siteName}</TableCell>
                <TableCell>
                  <Checkbox checked={row.checked} />
                </TableCell>
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
        {sites.length !== 0 && (
          <Filter sites={sites} setSiteName={setSiteName} />
        )}
        <Grid
          container
          spacing={3}
          justify="center"
          className={classes.containerEnd}
        >
          <Grid item sm={2}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              fullWidth
              type="submit"
            >
              Filter
            </Button>
          </Grid>
          <Grid item sm={2}>
            <Button
              variant="outlined"
              color="default"
              className={classes.button}
              fullWidth
              onClick={() => initializeAppts()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={3} justify="center">
        <Grid item sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
