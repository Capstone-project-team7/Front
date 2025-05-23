import React from "react";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";

export default function SideMenuLayout() {
  return (
    <div className={styles.layoutwrapper}>
      <Header />
      <main className={styles.layoutwrapper__sidemenu}>
        <SideMenu />
        <Outlet />
      </main>
    </div>
  );
}
