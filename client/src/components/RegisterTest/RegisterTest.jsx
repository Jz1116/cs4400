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
import * as _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
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

export default function RegisterTest(props) {
  // states
  const classes = useStyles();
  const [appts, setAppts] = useState([]);
  const [siteName, setSiteName] = useState("All");
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState(false);
  const [sortDate, setSortDate] = useState("");
  const [sortTime, setSortTime] = useState("");
  const [sortSites, setSortSites] = useState("");

  // initialize appointments
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

  const handleChange = (event, date, time, name) => {
    const selectedAppt = appts.find(
      (appt) =>
        appt.date === date && appt.time === time && appt.siteName === name
    );
    selectedAppt.checked = event.target.checked;
    setAppts(appts);
  };

  const handleSignUp = async () => {
    let count = 0;

    const res = await axios.get(`${Constants.APPT_API_URL}/${props.username}`);
    if (res.data.hasAppt) {
      toast.warn("😢 You have signed up for one appointment.");
      return;
    }

    appts.forEach((appt) => {
      if (appt.checked) {
        count += 1;
      }
    });

    if (count > 1) {
      toast.warn("😢 Please sign up only one appointment.");
    } else if (count === 0) {
      toast.warn("😢 Please sign up one appointment.");
    } else if (count === 1) {
      const appt = appts.find((appointment) => appointment.checked === true);
      const form = {
        username: props.username,
        siteName: appt.siteName,
        date: appt.date,
        time: appt.time,
      };

      const encodedForm = JSON.stringify(form);

      axios
        .post(Constants.STUDENT_REGISTER_APPT_API_URL, { encodedForm })
        .then((response) => {
          if (response.data.success) {
            toast.success(
              "😉 You have signed up for an appointment successfully!"
            );
          }
        });
    }
  };

  // handle sorting for each column
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
      updatedAppts.sort((a, b) => a.time.localeCompare(b.time));
      setSortTime("descending");
      setAppts(updatedAppts);
    } else if (sortTime === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => b.time.localeCompare(a.time));
      setSortTime("ascending");
      setAppts(updatedAppts);
    }
  };

  const handleSortSites = () => {
    if (sortSites === "" || sortSites === "ascending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => a.siteName.localeCompare(b.siteName));
      setSortSites("descending");
      setAppts(updatedAppts);
    } else if (sortSites === "descending") {
      const updatedAppts = _.cloneDeep(appts);
      updatedAppts.sort((a, b) => b.siteName.localeCompare(a.siteName));
      setSortSites("ascending");
      setAppts(updatedAppts);
    }
  };

  return (
    <>
      <Title>Sign up for a Test</Title>
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
            <TableCell>Site Address</TableCell>
            <TableCell>
              <IconButton onClick={() => handleSortSites()} size="small">
                <UnfoldMoreIcon fontSize="small" />
              </IconButton>
              Test Site
            </TableCell>
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
                  <Checkbox
                    onChange={(event) =>
                      // eslint-disable-next-line prettier/prettier
                      handleChange(event, row.date, row.time, row.siteName)}
                  />
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
            onClick={() => handleSignUp()}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

RegisterTest.propTypes = {
  username: PropTypes.string.isRequired,
};
