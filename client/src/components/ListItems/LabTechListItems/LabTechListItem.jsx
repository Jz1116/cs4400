import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

export default function LabTechListItems(props) {
  const { handleBarStatus } = props;

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          primary="Process Pool"
          onClick={() => handleBarStatus("process_pool")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary="Create Pool"
          onClick={() => handleBarStatus("create_pool")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText
          primary="View Pools"
          onClick={() => handleBarStatus("view_pools")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          primary="My Processed Tests"
          onClick={() => handleBarStatus("my_processed_tests")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText
          primary="Aggregate Results"
          onClick={() => handleBarStatus("aggregate_result")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText
          primary="Daily Results"
          onClick={() => handleBarStatus("daily_result")}
        />
      </ListItem>
    </div>
  );
}
