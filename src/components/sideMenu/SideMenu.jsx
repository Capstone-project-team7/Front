import React from "react";
import styles from "./SideMenu.module.scss";
import MenuItem from "../menuItem/MenuItem";

export default function SideMenu() {
  return (
    <div className={styles.sidemenu}>
      <span className={styles.sidemenu__title}>Menu</span>
      <div className={styles.sidemenu__separator}></div>
      <ul className={styles.sidemenu__list}>
        <MenuItem label="홈페이지" to="/" />
        <MenuItem label="캘린더" to="/calendar" />
        <MenuItem label="CCTV 관리" to="/cctv" />
        <MenuItem label="이용가이드" to="/guide" />
        <MenuItem label="마이페이지" to="/mypage" />
      </ul>
      <div className={styles.sidemenu__terms}>
        <span>이용약관</span>
        <span>|</span>
        <span>개인정보처리방침</span>
      </div>
    </div>
  );
}
