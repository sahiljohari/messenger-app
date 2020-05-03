import React from "react";
import styles from "./Section.module.css";
import cx from "classnames";

const Section = ({ header, children, className }) => {
  return (
    <div className={cx(styles.root, className)}>
      <h2>{header}</h2>
      {children}
    </div>
  );
};

export default Section;
