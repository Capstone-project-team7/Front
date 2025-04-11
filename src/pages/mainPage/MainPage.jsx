import React, { useContext } from "react";
import styles from "./MainPage.module.scss";
import Header from "../../components/header/Header";
import SideMenu from "../../components/sideMenu/SideMenu";
import { UserContext } from "../../stores/UserContext";

export default function MainPage() {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.mainpage}>
      <Header></Header>
      {user ? <SideMenu></SideMenu> : ""}
    </div>
  );
}
