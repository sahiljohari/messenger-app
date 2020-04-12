import React, { useState, useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";

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

  return <div>[placeholder for ChatInputField component]</div>;
};

export default ChatInputField;
