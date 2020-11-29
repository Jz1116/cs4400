import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";

export default function StudentListItems(props) {
  const { handleBarStatus } = props;

  return (
    <div>
      <ListItem button onClick={() => handleBarStatus("home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("my_result")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="My Results" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("aggregate_result")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Aggregate Results" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("daily_result")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Daily Results" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("sign_up_test")}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Up for a Test" />
      </ListItem>
    </div>
  );
}

StudentListItems.propTypes = {
  handleBarStatus: PropTypes.func.isRequired,
};
