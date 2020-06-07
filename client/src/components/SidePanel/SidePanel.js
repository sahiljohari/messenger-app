import React, { useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
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
            <i className="fas fa-user-circle"></i>
            <p className={styles.userName}>{capitalize(name)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
