import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import { clientUrls } from "./clientUrls";

const App = () => (
  <div className={styles.root}>
    <Router>
      <Switch>
        <Route path={clientUrls.root} exact component={Login} />
        <Route path={clientUrls.chat} exact component={Chat} />
      </Switch>
    </Router>
  </div>
);

export default App;
