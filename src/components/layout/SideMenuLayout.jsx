import React from "react";
import styles from "./Layout.module.scss";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";

export default function SideMenuLayout() {
  const token = localStorage.getItem("token");
  if (!token) {
    //return <Navigate to={"/login"} replace />;
  }
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
