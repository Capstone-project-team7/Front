import React from "react";
import styles from "./ResetPasswordPage.module.scss";
import Header from "../../components/header/Header";
import ResetPasswordBox from "./components/ResetPasswordBox";

export default function ResetPasswordPage() {
  return (
    <div className={styles.resetpasswordpage}>
      <Header></Header>
      <div className={styles.resetpasswordpage__content}>
        <ResetPasswordBox></ResetPasswordBox>
      </div>
    </div>
  );
}
