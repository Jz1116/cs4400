import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { toast } from "react-toastify";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import Title from "./components/Title";
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

export default function ReassignTester() {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  const [testersInfo, setTestersInfo] = useState([]);
  const [updatedTestersInfo, setUpdatedTestersInfo] = useState([]);
  const [sites, setSites] = useState([]);
  const [alertStatus, setAlertStatus] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  if (status === false) {
    axios.get(Constants.VIEW_TESTERS_API_URL).then((response) => {
      setTestersInfo(response.data);
      // deep copy
      setUpdatedTestersInfo(_.cloneDeep(response.data));
    });
    axios.get(Constants.ALL_SITES_API_URL).then((response) => {
      setSites(response.data);
    });
    setStatus(true);
  }

  const handleSites = async (username, updatedSites) => {
    const selectedTesterInfo = updatedTestersInfo.find(
      (testerInfo) => testerInfo.username === username
    );
    const selectedSites = selectedTesterInfo.assignedSites;
    const set = new Set(updatedSites);
    const deletedSites = [];
    selectedSites.forEach((site) => {
      if (!set.has(site)) {
        deletedSites.push(site);
      }
    });
    if (deletedSites.length === 0) {
      selectedTesterInfo.assignedSites = updatedSites;
      setUpdatedTestersInfo(updatedTestersInfo);
    } else {
      const deletedSite = deletedSites[0];
      const response = await axios.post(
        Constants.SITE_WITH_ONLY_ONE_TESTER_API_URL,
        {
          site: deletedSite,
        }
      );
      if (response.data.success) {
        setButtonDisabled(true);
        updatedSites.push(deletedSite);
        selectedTesterInfo.assignedSites = updatedSites;
        setUpdatedTestersInfo(updatedTestersInfo);
        setAlertStatus("cannot unassign tester");
      } else {
        selectedTesterInfo.assignedSites = updatedSites;
        setUpdatedTestersInfo(updatedTestersInfo);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlertStatus("");
    setButtonDisabled(false);
  };

  const handleUpdate = () => {
    testersInfo.forEach((testerInfo, idx) => {
      const { assignedSites } = testerInfo;
      const updatedSites = updatedTestersInfo[idx].assignedSites;
      const originalSet = new Set(assignedSites);
      const newSet = new Set(updatedSites);

      const addedSites = [];
      const deletedSites = [];

      assignedSites.forEach((site) => {
        if (!newSet.has(site)) {
          deletedSites.push(site);
        }
      });

      updatedSites.forEach((site) => {
        if (!originalSet.has(site)) {
          addedSites.push(site);
        }
      });

      addedSites.forEach((site) => {
        const form = { username: testerInfo.username, siteName: site };
        const encodedForm = JSON.stringify(form);
        axios.post(Constants.ASSIGN_TESTER_API_URL, { encodedForm });
      });

      deletedSites.forEach((site) => {
        const form = { username: testerInfo.username, siteName: site };
        const encodedForm = JSON.stringify(form);
        axios.post(Constants.UNASSIGN_TESTER_API_URL, { encodedForm });
      });
    });

    setTestersInfo(_.cloneDeep(updatedTestersInfo));
    toast.success("😏 The assigned sites are updated!");
  };

  return (
    <>
      <Title>Reassign Tester</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Assigned Sites</TableCell>
          </TableRow>
        </TableHead>
        {status && (
          <TableBody>
            {updatedTestersInfo.map((row) => (
              <TableRow key={row.username}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNum}</TableCell>
                <TableCell>
                  <Autocomplete
                    multiple
                    options={sites}
                    onChange={(event, value) =>
                      // eslint-disable-next-line prettier/prettier
                      handleSites(row.username, value)}
                    getOptionLabel={(option) => option}
                    defaultValue={row.assignedSites}
                    renderInput={(params) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
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
            disabled={buttonDisabled}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Grid>
        <Grid sm={12}>
          {alertStatus === "cannot unassign tester" ? (
            <Alert severity="warning" onClose={() => handleCloseAlert()}>
              <AlertTitle>
                This tester is the only one in the site. The operation failed.
                Please try again.
              </AlertTitle>
            </Alert>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
