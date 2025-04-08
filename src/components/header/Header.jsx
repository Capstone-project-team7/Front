import React from "react";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo} onClick={() => {}}>
        <img
          src="@assets/images/logo.png"
          className={styles.header__logo_image}
        />
      </div>
      <div className={styles.header__profile}>
        <button className={styles.header__profile__logout} onClick={() => {}}>
          <div>아이콘</div>
          <span>로그아웃</span>
        </button>
        <div className={styles.header__profile__hello}>
          <div>아이콘</div>
          <span>username님 안녕하세요!</span>
        </div>
      </div>
    </header>
  );
}
