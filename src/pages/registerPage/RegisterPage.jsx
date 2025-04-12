import React from "react";
import styles from "./RegisterPage.module.scss";
import Header from "../../components/header/Header";
import RegisterBox from "./components/RegisterBox";

export default function RegisterPage() {
  return (
    <div className={styles.registerpage}>
      <Header></Header>
      <div className={styles.registerpage__content}>
        <RegisterBox></RegisterBox>
      </div>
    </div>
  );
}
