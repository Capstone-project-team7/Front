import React from "react";
import styles from "./SideMenu.module.scss";
import MenuItem from "../menuItem/MenuItem";

export default function SideMenu() {
  return (
    <div className={styles.sidemenu}>
      <span className={styles.sidemenu__title}>Menu</span>
      <div className={styles.sidemenu__separator}></div>
      <ul className={styles.sidemenu__list}>
        <MenuItem label="Home" to="/" />
        <MenuItem label="Calendar" to="/calendar" />
        <MenuItem label="CCTV" to="/cctv" />
        <MenuItem label="Guide" to="/guide" />
        <MenuItem label="MyPage" to="/mypage" />
      </ul>
    </div>
  );
}
