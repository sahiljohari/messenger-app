import React, { useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import ChatInputField from "../ChatInputField/ChatInputField";
import MessageBubble from "../MessageBubble/MessageBubble";
import InfoBar from "../InfoBar/InfoBar";
import styles from "./ChatContainer.module.css";

const ChatContainer = () => {
  const { userName, messages: chatMessages } = useContext(ChatContext);
  return (
    <div className={styles.root}>
      <InfoBar />
      {chatMessages.map(({ user, text }, i) => {
        const isFromNativeUser = user === userName;
        return (
          <MessageBubble
            key={i}
            user={user}
            message={text}
            isFromNativeUser={isFromNativeUser}
          />
        );
      })}

      <ChatInputField />
    </div>
  );
};

export default ChatContainer;
