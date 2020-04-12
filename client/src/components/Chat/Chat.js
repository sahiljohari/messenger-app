import React, { useState, useEffect, useMemo, useCallback } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import { ChatProvider } from "../ChatContext/ChatContext";
import SidePanel from "../SidePanel/SidePanel";
import ChatContainer from "../ChatContainer/ChatContainer";

let socket;

const Chat = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  const { name, room } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    socket = io(ENDPOINT);

    setUserName(name);
    setChatRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((messages) => [...messages, { user, text }]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = useCallback((e, message) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(message));
    }
  }, []);

  console.log("messages", messages);
  console.log("users", users);

  const chatContextValues = useMemo(
    () => ({
      users,
      userName,
      chatRoom,
      message,
      messages,
      sendMessage,
    }),
    [users, userName, chatRoom, message, messages, sendMessage]
  );

  return (
    <ChatProvider values={chatContextValues}>
      <div className={styles.root}>
        <SidePanel />
        <ChatContainer />
      </div>
    </ChatProvider>
  );
};

export default Chat;
