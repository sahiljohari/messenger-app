import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import { ChatProvider } from "../ChatContext/ChatContext";
import SidePanel from "../SidePanel/SidePanel";
import ChatContainer from "../ChatContainer/ChatContainer";
import { clientUrls } from "../../clientUrls";

let socket;

const Chat = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typer, setTyper] = useState("");
  const [numTypers, setNumTypers] = useState(0);

  const [hasError, setHasError] = useState(false);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    socket = io(ENDPOINT);

    setUserName(name);
    setChatRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (!!error) {
        setHasError(true);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((messages) => [...messages, { user, text }]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("userTyping", ({ user, typing, numTypers }) => {
      setTyper(user);
      setIsTyping(typing);
      setNumTypers(numTypers);
    });
  }, []);

  const sendTypingStatus = useCallback(
    (isTyping) => {
      socket.emit("typing", { user: userName, chatRoom, typing: isTyping });
    },
    [userName, chatRoom]
  );

  const sendMessage = useCallback((e, message) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(message));
    }
  }, []);

  const chatContextValues = useMemo(
    () => ({
      users,
      userName,
      chatRoom,
      message,
      messages,
      typer,
      numTypers,
      isTyping,
      sendMessage,
      sendTypingStatus,
    }),
    [
      users,
      userName,
      chatRoom,
      message,
      messages,
      typer,
      numTypers,
      isTyping,
      sendMessage,
      sendTypingStatus,
    ]
  );

  if (hasError) {
    return <Redirect exact to={clientUrls.forbidden} />;
  }

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
