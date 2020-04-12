import React, { useState, useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import styles from "./ChatInputField.module.css";
import messages from "./messages";

const ChatInputField = () => {
  const { sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    sendMessage(e, message);
    setMessage("");
  };

  return (
    <div className={styles.root}>
      <input
        className={styles.textInput}
        value={message}
        placeholder={messages.input_placeholder.defaultMessage}
        onChange={handleChange}
        onKeyPress={(e) => (e.key === "Enter" ? handleSend(e) : null)}
      />
    </div>
  );
};

export default ChatInputField;
