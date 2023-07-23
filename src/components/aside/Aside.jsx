import React from "react";
import styles from "./Aside.module.scss";
import { tabs } from "../../../Data/Data";

const Aside = ({ active, handleOnActive }) => {
  const handleOnClick = (index) => {
    handleOnActive(index);
  };

  return (
    <div className={styles.aside}>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => {
              handleOnClick(tab.id);
            }}
            className={`${styles.tab} ${active === tab.id && styles.active}`}
          >
            <span className={tab.icon}></span>
            <a>{tab.title}</a>
          </div>
        ))}
      </div>
      <p className={styles.copy_rights}>
        <span className="bi bi-c-circle"></span>Tamtam international - Stage
        2023
      </p>
    </div>
  );
};

export default Aside;
