import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../ChatContext/ChatContext";
import { clientUrls } from "../../clientUrls";
import styles from "./SidePanel.module.css";
import messages from "./messages";
import capitalize from "lodash/capitalize";

const SidePanel = () => {
  const { users } = useContext(ChatContext);

  return (
    <div className={styles.root}>
      <div className={styles.panelHeader}>
        {messages.panel_header.defaultMessage}
      </div>
      <div>
        {users.map(({ name }, i) => (
          <div key={i} className={styles.panelListItem}>
            {capitalize(name)}
          </div>
        ))}
      </div>
      <div className={styles.panelFooter}>
        <a href={clientUrls.logout}>{messages.panel_footer.defaultMessage}</a>
      </div>
    </div>
  );
};

export default SidePanel;
