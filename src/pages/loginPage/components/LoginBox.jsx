import React, { useState } from "react";
import styles from "./LoginBox.module.scss";
import { Link } from "react-router-dom";


export default function LoginBox() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isStay, setIsStay] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const payload = {
      user_email: userEmail,
      user_password: userPassword,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok && result.status === "success") {
        const { token, user_id, first_login, expiresIn } = result.data;
  
        // 필요하다면 localStorage 저장
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("first_login", first_login);
  
        alert("로그인 성공!");
  
        // 예시로 이동 (react-router 사용 시)
        // navigate("/main");
      } else {
        alert(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 오류 또는 네트워크 에러가 발생했습니다.");
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