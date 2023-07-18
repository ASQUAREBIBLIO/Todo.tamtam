import React from "react";
import styles from "./Tab.module.scss";

const TabItem = ({ id, icon, title, index, handleOnClick }) => {
  return (
    <div
      onClick={handleOnClick}
      className={`${styles.tab} ${index === id && styles.active}`}
    >
      <span className={icon}></span>
      <a>{title}</a>
    </div>
  );
};

export default TabItem;
