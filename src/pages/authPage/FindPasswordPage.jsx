import React, { useState } from "react";
import styles from "./AuthPages.module.scss";
import AuthBox from "@components/authBox/AuthBox";

export default function FindPasswordPage() {
  const [userEmail, setUserEmail] = useState("");

  const handleFindPassword = async (e) => {
    e.preventDefault();

    console.log(userEmail);
    try {
      // 유저 이메일로 비밀번호 초기화 메일 전송 api 추가
    } catch (err) {
      // 실패 시 오류 출력
    }
  };
  return (
    <div className={styles.pagewrapper}>
      <AuthBox
        title="비밀번호 변경"
        submitButton={
          <button
            className={styles.pagewrapper__form__button}
            onClick={handleFindPassword}
          >
            비밀번호 초기화
          </button>
        }
        isLogin={false}
      >
        <form className={styles.pagewrapper__form}>
          <input
            className={styles.pagewrapper__form__input}
            type="email"
            placeholder="이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="email"
          />
        </form>
      </AuthBox>
    </div>
  );
}
