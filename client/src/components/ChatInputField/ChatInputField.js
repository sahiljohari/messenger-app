import React, { useState, useContext } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { ChatContext } from "../ChatContext/ChatContext";
import styles from "./ChatInputField.module.css";
import messages from "./messages";

const ChatInputField = () => {
  const { typer, isTyping, sendMessage, sendTypingStatus } = useContext(
    ChatContext
  );
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    sendMessage(e, message);
    setMessage("");
    sendTypingStatus(false);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" && e.target.value !== "") {
      sendTypingStatus(true);
    } else {
      sendTypingStatus(false);
    }
  };

  return (
    <div className={styles.root}>
      {isTyping && (
        <p className={styles.typingIndicator}>{typer} is typing...</p>
      )}
      <InputGroup className={styles.inputGroup}>
        <FormControl
          className={styles.textInput}
          value={message}
          placeholder={messages.input_placeholder.defaultMessage}
          autoFocus
          onChange={handleChange}
          onKeyPress={(e) => (e.key === "Enter" ? handleSend(e) : null)}
          onKeyDown={handleKeyDown}
        />
        <InputGroup.Append>
          <Button
            variant="light"
            onClick={(e) => handleSend(e)}
            disabled={!message}
          >
            <i className="far fa-paper-plane"></i>
            {messages.send_button_text.defaultMessage}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default ChatInputField;
