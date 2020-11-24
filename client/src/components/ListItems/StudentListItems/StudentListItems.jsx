import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";

export default function StudentListItems(props) {
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
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          primary="My Results"
          onClick={() => handleBarStatus("my_result")}
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
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText
          primary="Sign Up for a Test"
          onClick={() => handleBarStatus("sign_up_test")}
        />
      </ListItem>
    </div>
  );
}
