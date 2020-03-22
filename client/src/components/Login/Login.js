import React, { useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.css";

import TextInput from "../common/TextInput/TextInput";
import { clientUrls } from "../../clientUrls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const formComponents = [
    {
      value: username,
      placeholder: "Enter username",
      onChange: e => setUsername(e.target.value)
    },
    {
      value: chatRoom,
      placeholder: "Enter the chat room name",
      onChange: e => setChatRoom(e.target.value)
    }
  ];

  const renderForm = formComponentOptions => {
    return formComponentOptions.map((element, i) => {
      const { type, ...others } = element;
      const FormField = type ? type : TextInput;
      return <FormField key={i} {...others} />;
    });
  };

  const clearForm = () => {
    setUsername("");
    setChatRoom("");
  };

  const isValid = !!username && !!chatRoom;

  return (
    <div className={styles.root}>
      <>
        {renderForm(formComponents)}
        <Link
          to={`${clientUrls.chat}?username=${username}&chatroom=${chatRoom}`}
        >
          <button
            onClick={clearForm}
            disabled={!isValid}
            className={
              isValid
                ? styles.submitButton
                : cx(styles.submitButton, styles.submitButtonDisabled)
            }
            type="submit"
          >
            Sign In
          </button>
        </Link>
      </>
    </div>
  );
};

export default Login;
