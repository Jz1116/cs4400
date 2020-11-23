import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SelectPool from "./components/SelectPool";
import StartProcess from "./components/StartProcess";

const pools = [11222, 22333, 33444];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 6),
    textTransform: "none",
  },
}));

export default function ProcessPool() {
  const classes = useStyles();
  const [poolSelected, setSelected] = useState(false);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Process Pool
        </Typography>
        {poolSelected === false && (
          <SelectPool pools={pools} setSelected={setSelected} />
        )}
        {poolSelected === true && <StartProcess />}
      </div>
    </Container>
  );
}