import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
