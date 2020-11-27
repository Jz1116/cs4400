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

export default function ViewAppts() {
  const classes = useStyles();
  const [siteName, setSiteName] = useState("All");
  const [availableStatus, setAvailableStatus] = useState("Show all");
  const [appts, setAppts] = useState([]);
  const [status, setStatus] = useState(false);

  const initializeAppts = () => {
    const form = {
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      siteName: null,
      isAvailable: null,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.ALL_APPTS_API_URL, {
        encodedForm,
      })
      .then((response) => {
        setStatus(true);
        setAppts(response.data);
      });
  };

  if (status === false) {
    initializeAppts();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    let isAvailable;

    if (availableStatus === "Show all") {
      isAvailable = null;
    } else if (availableStatus === "Show available only") {
      isAvailable = 1;
    } else if (availableStatus === "Show booked only") {
      isAvailable = 0;
    }

    const form = {
      startDate: startDate === "" ? null : startDate,
      endDate: endDate === "" ? null : endDate,
      startTime: startTime === "" ? null : startTime,
      endTime: endTime === "" ? null : endTime,
      siteName: siteName === "All" ? null : siteName,
      isAvailable,
    };

    const encodedForm = JSON.stringify(form);
    axios
      .post(Constants.ALL_APPTS_API_URL, { encodedForm })
      .then((response) => {
        setAppts(response.data);
        toast.success("🎆 Appointments are retrieved successfully!");
      });
  };

  return (
    <>
      <Title>View Appointments</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Test Site</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        {appts.length !== 0 && (
          <TableBody>
            {appts.map((row) => (
              <TableRow key={`${row.date} ${row.time} ${row.siteName}`}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.siteName}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.username}</TableCell>
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
        <Filter
          setSiteName={setSiteName}
          setAvailableStatus={setAvailableStatus}
        />
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
              fullWidth
              type="submit"
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
              onClick={() => initializeAppts()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
