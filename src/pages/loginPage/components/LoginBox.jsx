import React, { useState } from "react";
import styles from "./LoginBox.module.scss";
import { Link } from "react-router-dom";

export default function LoginBox() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isStay, setIsStay] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(userEmail);
    console.log(userPassword);
    console.log(isStay);

    try {
      // 로그인 api 추가
    } catch (err) {
      // 실패 시 오류 출력
    }
  };

  return (
    <div className={styles.loginbox}>
      <span className={styles.loginbox__title}>로그인</span>
      <form className={styles.loginbox__form} onSubmit={handleLogin}>
        <input
          className={styles.loginbox__form__input}
          type="email"
          placeholder="이메일"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className={styles.loginbox__form__input}
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label className={styles.loginbox__form__saveid}>
          <input
            type="checkbox"
            checked={isStay}
            onChange={(e) => setIsStay(e.target.checked)}
          />
          <span className={styles.loginbox__form__saveid__box}></span>
          <span className={styles.loginbox__form__saveid__text}>
            로그인 상태 유지
          </span>
        </label>

        <button className={styles.loginbox__form__button} type="submit">
          로그인
        </button>
      </form>
      <div className={styles.loginbox__bottom}>
        <Link to="/findpassword" className={styles.loginbox__bottom__link}>
          비밀번호 찾기
        </Link>
        <Link to="/register" className={styles.loginbox__bottom__link}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
