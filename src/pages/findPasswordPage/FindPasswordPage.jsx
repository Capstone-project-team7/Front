import React from "react";
import styles from "./FindPasswordPage.module.scss";
import Header from "../../components/header/Header";
import FindPasswordBox from "./components/FindPasswordBox";

export default function FindPasswordPage() {
  return (
    <div className={styles.findpasswordpage}>
      <Header></Header>
      <div className={styles.findpasswordpage__content}>
        <FindPasswordBox></FindPasswordBox>
      </div>
    </div>
  );
}
