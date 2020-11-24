import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HomeIcon from "@material-ui/icons/Home";

export default function LabTechListItems(props) {
  const { handleBarStatus } = props;

  return (
    <div>
      <ListItem button onClick={() => handleBarStatus("home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("process_pool")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Process Pool" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("create_pool")}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Pool" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("view_pools")}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="View Pools" />
      </ListItem>
      <ListItem button onClick={() => handleBarStatus("my_processed_tests")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="My Processed Tests" />
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
