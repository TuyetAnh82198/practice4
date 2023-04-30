import React from "react";

import styles from "./Header.module.css";

import imgHeader from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton.jsx";

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <HeaderCartButton />
      </div>
      <div className={styles.mainimage}>
        <img src={imgHeader} alt="banner" />
      </div>
    </React.Fragment>
  );
};

export default Header;
