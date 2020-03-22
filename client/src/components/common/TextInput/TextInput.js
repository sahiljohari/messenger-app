import React from "react";
import styles from "./TextInput.module.css";

const TextInput = props => {
  return <input className={styles.root} {...props} />;
};

export default TextInput;
