import React from "react";
import styles from "./MainPage.module.scss";
import Header from "../../components/header/Header";
import SideMenu from "../../components/sideMenu/SideMenu";

export default function MainPage() {
  return (
    <div className={styles.mainpage}>
      <Header></Header>
      <SideMenu></SideMenu>
      <div className={styles.mainpage__content}>{/* 메인페이지 콘텐츠 */}</div>
    </div>
  );
}
