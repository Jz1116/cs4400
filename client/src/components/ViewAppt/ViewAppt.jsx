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
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import IconButton from "@material-ui/core/IconButton";
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

export default function ViewAppts() {
  const classes = useStyles();
  const [siteName, setSiteName] = useState("All");
  const [availableStatus, setAvailableStatus] = useState("Show all");
  const [appts, setAppts] = useState([]);
  const [status, setStatus] = useState(false);
  const [sortDate, setSortDate] = useState("");
  const [sortTime, setSortTime] = useState("");
  const [sortSites, setSortSites] = useState("");
  const [sortLocation, setSortLocation] = useState("");
  const [sortUsers, setSortUsers] = useState("");

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

  // sort based on columns names
  const handleSortDate = () => {
    if (sortDate === "" || sortDate === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort(
        (a, b) =>
          moment(b.date, "M/D/YY").unix() - moment(a.date, "M/D/YY").unix()
      );
      setSortDate("descending");
      setAppts(updatedAppts);
    } else if (sortDate === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort(
        (a, b) =>
          moment(a.date, "M/D/YY").unix() - moment(b.date, "M/D/YY").unix()
      );
      setSortDate("ascending");
      setAppts(updatedAppts);
    }
  };

  const handleSortTime = () => {
    if (sortTime === "" || sortTime === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => b.time.localeCompare(a.time));
      setSortTime("descending");
      setAppts(updatedAppts);
    } else if (sortTime === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => a.time.localeCompare(b.time));
      setSortTime("ascending");
      setAppts(updatedAppts);
    }
  };

  const handleSortSites = () => {
    if (sortSites === "" || sortSites === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => b.siteName.localeCompare(a.siteName));
      setSortSites("descending");
      setAppts(updatedAppts);
    } else if (sortSites === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => a.siteName.localeCompare(b.siteName));
      setSortSites("ascending");
      setAppts(updatedAppts);
    }
  };

  const handleSortLocation = () => {
    if (sortLocation === "" || sortLocation === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => b.location.localeCompare(a.location));
      setSortLocation("descending");
      setAppts(updatedAppts);
    } else if (sortLocation === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => a.location.localeCompare(b.location));
      setSortLocation("ascending");
      setAppts(updatedAppts);
    }
  };

  const handleSortUsers = () => {
    if (sortUsers === "" || sortUsers === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => {
        if (a.username === null) {
          return 1;
        }
        if (b.username === null) {
          return -1;
        }
        return b.username.localeCompare(a.username);
      });
      setSortUsers("descending");
      setAppts(updatedAppts);
    } else if (sortUsers === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => {
        if (a.username === null) {
          return -1;
        }
        if (b.username === null) {
          return 1;
        }
        return a.username.localeCompare(b.username);
      });
      setSortUsers("ascending");
      setAppts(updatedAppts);
    }
  };

  return (
    <>
      <Title>View Appointments</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton onClick={() => handleSortDate()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              Date
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleSortTime()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              Time
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleSortSites()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              Test Site
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleSortLocation()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              Location
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleSortUsers()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              User
            </TableCell>
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
