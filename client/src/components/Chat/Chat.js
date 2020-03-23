import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

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

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages(messages => [...messages, { user, text }]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return <></>;
};

export default Chat;
