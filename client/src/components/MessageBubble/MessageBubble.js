import React, { useContext } from "react";
import { ChatContext } from "../ChatContext/ChatContext";

const MessageBubble = () => {
  const { userName, message } = useContext(ChatContext);

  return <div>[placeholder for MessageBubble component]</div>;
};

export default MessageBubble;
