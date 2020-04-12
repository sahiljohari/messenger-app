import React, { useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import ChatInputField from "../ChatInputField/ChatInputField";
import MessageBubble from "../MessageBubble/MessageBubble";
import styles from "./ChatContainer.module.css";

const ChatContainer = () => {
  const { userName, chatRoom, messages } = useContext(ChatContext);

  return (
    <div className={styles.root}>
      [placeholder for ChatContainer component]
      <MessageBubble />
      <ChatInputField />
    </div>
  );
};

export default ChatContainer;
