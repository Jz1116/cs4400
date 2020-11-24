import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";

export default function TesterListItems(props) {
  const { handleBarStatus } = props;

  return (
    <div>
      <ListItem button onClick={() => handleBarStatus("home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("change_site")}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Change Testing Site" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("view_appointments")}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="View Appointments" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("create_an_appointment")}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Appointments" />
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
    </div>
  );
}
