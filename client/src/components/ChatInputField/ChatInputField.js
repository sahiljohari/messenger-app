import React, { useState, useContext } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
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
    <InputGroup className={styles.root}>
      <FormControl
        className={styles.textInput}
        value={message}
        placeholder={messages.input_placeholder.defaultMessage}
        autoFocus
        onChange={handleChange}
        onKeyPress={(e) => (e.key === "Enter" ? handleSend(e) : null)}
      />
      <InputGroup.Append>
        <Button variant="outline-success" onClick={(e) => handleSend(e)}>
          <i className="far fa-paper-plane"></i>
          {messages.send_button_text.defaultMessage}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default ChatInputField;
