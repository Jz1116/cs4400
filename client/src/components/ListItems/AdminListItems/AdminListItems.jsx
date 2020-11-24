import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";

export default function AdminListItems(props) {
  const { handleBarStatus } = props;
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" onClick={() => handleBarStatus("home")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText
          primary="Reassign Testers"
          onClick={() => handleBarStatus("reassign_testers")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText
          primary="View Appointments"
          onClick={() => handleBarStatus("view_appointments")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary="Create Appointments"
          onClick={() => handleBarStatus("create_an_appointment")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary="Create Testing Site"
          onClick={() => handleBarStatus("create_testing_site")}
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
