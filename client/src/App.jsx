import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import StudentPage from "./pages/StudentPage";
import LabTechPage from "./pages/LabTechPage";
import TesterPage from "./pages/TesterPage";
import AdminPage from "./pages/AdminPage";
import LabTechTesterPage from "./pages/LabTechTesterPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/student" component={StudentPage} />
        <Route path="/labtech" component={LabTechPage} />
        <Route path="/tester" component={TesterPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/labtech+tester" component={LabTechTesterPage} />
      </Switch>
    </div>
  );
}

export default App;
