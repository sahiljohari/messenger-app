import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logout.module.css";
import { clientUrls } from "../../clientUrls";
import messages from "./messages";
import Section from "../common/Section/Section";

const Logout = () => {
  return (
    <Section
      header={messages.logout_message.defaultMessage}
      className={styles.root}
    >
      <Link to={clientUrls.root}>
        {messages.login_again_message.defaultMessage}
      </Link>
    </Section>
  );
};

export default Logout;
