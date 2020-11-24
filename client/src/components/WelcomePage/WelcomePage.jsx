import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  headerColor: {
    color: "#EAAA00",
  },
  normalText: {
    paddingTop: theme.spacing(10),
  },
}));

export default function WelcomePage() {
  const classes = useStyles();

  return (
    <Container
      maxWidth="md"
      component="main"
      className={classes.heroContent}
      justify="center"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <div className={classes.headerColor}>
            Welcome to GT Covid19 Testing System
          </div>
        </Typography>
        <Typography
          component="h6"
          variant="h6"
          align="center"
          color="textPrimary"
          gutterBottom
          className={classes.normalText}
        >
          Other helpful resources:
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`GT Official Website: `}
          <a href="https://www.gatech.edu/">https://www.gatech.edu/</a>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`Stamps Health: `}
          <a href="https://health.gatech.edu/">https://health.gatech.edu/</a>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`GTPD: `}
          <a href="http://www.police.gatech.edu/">
            http://www.police.gatech.edu/
          </a>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`GT Counseling Center: `}
          <a href="https://counseling.gatech.edu/">
            https://counseling.gatech.edu/
          </a>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`Center for Assessment, Referral, and Education (CARE): `}
          <a href="https://hw.gatech.edu/">https://hw.gatech.edu/</a>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
          className={classes.normalText}
        >
          {`Made with <${3} by Team 60`}
        </Typography>
      </div>
    </Container>
  );
}
