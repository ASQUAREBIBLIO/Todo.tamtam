import React from "react";
import styles from "./Header.module.scss";
import Profile from "../../assets/bi_person-circle.svg";

const Header = () => {
  return (
    <div className={styles.nav_bar}>
      <div className={styles.logo}>
        Todo<span>.tamtam</span>
      </div>
      <img src={Profile} alt="Profile" width={30} />
    </div>
  );
};

export default Header;
