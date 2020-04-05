import React, { useState, useEffect, useMemo } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { ChatProvider } from "../ChatContext/ChatContext";

let socket;

const Chat = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  const { name, room } = queryString.parse(location.search);

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

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const chatContextValues = useMemo(
    () => ({
      users,
      chatRoom,
      message,
      setMessage,
      messages,
      setMessages,
      sendMessage,
    }),
    [users, chatRoom, message, setMessage, messages, setMessages, sendMessage]
  );

  // This component will render the following components:
  //   - InfoBar
  //   - Messages
  //   - Input Field
  //   - TextContainer
  return (
    <ChatProvider values={chatContextValues}>
      <>
        <input
          value={message}
          onChange={handleChange}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </>
    </ChatProvider>
  );
};

export default Chat;
