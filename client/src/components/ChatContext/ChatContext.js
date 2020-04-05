import React, { createContext } from "react";

const ChatContext = createContext(null);

const ChatProvider = ({ values, children }) => {
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatProvider };
