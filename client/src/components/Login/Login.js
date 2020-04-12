import React, { useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.css";

import TextInput from "../common/TextInput/TextInput";
import { clientUrls } from "../../clientUrls";

const Login = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const { pathname } = location;

  const formComponents = [
    {
      value: userName,
      placeholder: "Enter user name",
      onChange: (e) => setUserName(e.target.value),
    },
    {
      value: chatRoom,
      placeholder: "Enter the chat room name",
      onChange: (e) => setChatRoom(e.target.value),
    },
  ];

  const renderForm = (formComponentOptions) => {
    return formComponentOptions.map((element, i) => {
      const { type, ...others } = element;
      const FormField = type ? type : TextInput;
      return <FormField key={i} {...others} />;
    });
  };

  const clearForm = () => {
    setUserName("");
    setChatRoom("");
  };

  const isValid = !!userName && !!chatRoom;

  return (
    <div className={styles.root}>
      <>
        {renderForm(formComponents)}
        <Link to={`${clientUrls.chat}?name=${userName}&room=${chatRoom}`}>
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
        {pathname === clientUrls.forbidden && (
          <p className={styles.errorMessage}>Username already in use</p>
        )}
      </>
    </div>
  );
};

export default Login;
