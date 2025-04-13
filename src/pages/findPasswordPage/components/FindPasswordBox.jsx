import React, { useState } from "react";
import styles from "./FindPasswordBox.module.scss";

export default function FindPasswordBox() {
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
    <div className={styles.findpasswordbox}>
      <span className={styles.findpasswordbox__title}>비밀번호 변경</span>
      <form
        className={styles.findpasswordbox__form}
        onSubmit={handleFindPassword}
      >
        <input
          className={styles.findpasswordbox__form__input}
          type="email"
          placeholder="이메일"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          autoComplete="email"
        />

        <button className={styles.findpasswordbox__form__button} type="submit">
          비밀번호 초기화
        </button>
      </form>
    </div>
  );
}
