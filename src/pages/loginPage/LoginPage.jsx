import React from "react";
import styles from "./LoginPage.module.scss";
import Header from "../../components/header/Header";
import LoginBox from "./components/LoginBox";

export default function LoginPage() {
  return (
    <div className={styles.loginpage}>
      <Header></Header>
      <div className={styles.loginpage__content}>
        <LoginBox></LoginBox>
      </div>
    </div>
  );
}
