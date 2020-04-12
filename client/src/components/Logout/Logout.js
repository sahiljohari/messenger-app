import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logout.module.css";
import { clientUrls } from "../../clientUrls";
import messages from "./messages";

const Logout = () => {
  return (
    <div className={styles.root}>
      <h2>{messages.logout_message.defaultMessage}</h2>
      <Link to={clientUrls.root}>
        {messages.login_again_message.defaultMessage}
      </Link>
    </div>
  );
};

export default Logout;
