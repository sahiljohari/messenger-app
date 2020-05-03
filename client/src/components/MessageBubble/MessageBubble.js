import React from "react";
import styles from "./MessageBubble.module.css";
import cx from "classnames";
import capitalize from "lodash/capitalize";

const MessageBubble = ({ user, message, isFromNativeUser }) => {
  const remoteBubbleStyle =
    user !== "chat master"
      ? cx(styles.root, styles.remoteUserMessageBubble)
      : cx(styles.root, styles.remoteMessageBubble);

  const bubbleStyle = isFromNativeUser
    ? styles.root
    : cx(styles.root, remoteBubbleStyle);

  const userNameOnBubble = isFromNativeUser ? "You" : capitalize(user);
  return (
    <div className={bubbleStyle}>
      {user !== "chat master" && (
        <p className={styles.userNameText}>{userNameOnBubble}</p>
      )}
      <p className={styles.messageText}>{message}</p>
    </div>
  );
};

export default MessageBubble;
