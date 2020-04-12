import React from "react";
import styles from "./MessageBubble.module.css";
import cx from "classnames";
import capitalize from "lodash/capitalize";

const MessageBubble = ({ user, message, isFromNativeUser }) => {
  const bubbleStyle = isFromNativeUser
    ? styles.root
    : cx(styles.root, styles.nativeMessageBubble);

  const userNameOnBubble = isFromNativeUser ? "You" : capitalize(user);
  return (
    <div className={bubbleStyle}>
      <p className={styles.userNameText}>{userNameOnBubble}</p>
      <p className={styles.messageText}>{message}</p>
    </div>
  );
};

export default MessageBubble;
