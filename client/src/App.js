import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Chat from "./components/Chat/Chat";
import { clientUrls } from "./clientUrls";

const App = () => {
  return (
    <div className={styles.root}>
      <Router>
        <Switch>
          <Route
            path={[clientUrls.root, clientUrls.forbidden]}
            exact
            component={Login}
          />
          <Route path={clientUrls.chat} exact component={Chat} />
          <Route path={clientUrls.logout} exact component={Logout} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
