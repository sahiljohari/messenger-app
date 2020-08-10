import React from "react";
import styles from "./Section.module.css";
import cx from "classnames";

const Section = ({ header, children, className, hasFormContent = false }) => {
  return (
    <div className={cx(styles.root, className)}>
      <h2>{header}</h2>
      {hasFormContent ? (
        <form className={styles.form}>{children}</form>
      ) : (
        children
      )}
    </div>
  );
};

export default Section;
