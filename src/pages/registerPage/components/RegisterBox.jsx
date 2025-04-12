import React, { useState } from "react";
import styles from "./RegisterBox.module.scss";
import { Link } from "react-router-dom";

export default function RegisterBox() {
  const [userEmail, setUserEmail] = useState("");
  const [userEmailDomain, setUserEmailDomain] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [isAgreeTerm, setIsAgreeTerm] = useState(false);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);
  const [isAgreeAlarm, setIsAgreeAlarm] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const fullEmail = `${userEmail}@${userEmailDomain}`;

    console.log(fullEmail);
    console.log(userPassword);
    console.log(name);
    console.log(isAgreeTerm);
    console.log(isAgreePrivacy);
    console.log(isAgreeAlarm);

    try {
      // 회원가입 api 추가
    } catch (err) {
      // 실패 시 오류 출력
    }
  };

  return (
    <div className={styles.registerbox}>
      <span className={styles.registerbox__title}>회원 가입</span>
      <form className={styles.registerbox__form} onSubmit={handleRegister}>
        <div className={styles.registerbox__form__email}>
          <input
            className={styles.registerbox__form__email__id}
            type="text"
            placeholder="이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="username"
          />
          @
          <select
            className={styles.registerbox__form__email__domain}
            value={userEmailDomain}
            onChange={(e) => setUserEmailDomain(e.target.value)}
            placeholder="도메인 선택"
          >
            <option value="" disabled>
              도메인 선택
            </option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
          </select>
        </div>

        <input
          className={styles.registerbox__form__input}
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          autoComplete="new-password"
        />
        <input
          className={styles.registerbox__form__input}
          type="password"
          placeholder="비밀번호 확인"
          value={userPasswordCheck}
          onChange={(e) => setUserPasswordCheck(e.target.value)}
          autoComplete="new-password"
        />
        {userPasswordCheck &&
          (userPassword === userPasswordCheck ? (
            <span>일치</span>
          ) : (
            <span>불일치</span>
          ))}

        <input
          className={styles.registerbox__form__input}
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <label className={styles.registerbox__form__checkbox}>
          <input
            type="checkbox"
            checked={isAgreeTerm}
            onChange={(e) => setIsAgreeTerm(e.target.checked)}
          />
          <span className={styles.registerbox__form__checkbox__box}></span>
          <span className={styles.registerbox__form__checkbox__text}>
            [필수]
            <span onClick={() => {}}> 최종이용자 이용약관</span>에 동의합니다.
          </span>
        </label>
        <label className={styles.registerbox__form__checkbox}>
          <input
            type="checkbox"
            checked={isAgreePrivacy}
            onChange={(e) => setIsAgreePrivacy(e.target.checked)}
          />
          <span className={styles.registerbox__form__checkbox__box}></span>
          <span className={styles.registerbox__form__checkbox__text}>
            [필수]
            <span onClick={() => {}}> 개인정보 수집 및 이용</span>에 동의합니다.
          </span>
        </label>
        <label className={styles.registerbox__form__checkbox}>
          <input
            type="checkbox"
            checked={isAgreeAlarm}
            onChange={(e) => setIsAgreeAlarm(e.target.checked)}
          />
          <span className={styles.registerbox__form__checkbox__box}></span>
          <span className={styles.registerbox__form__checkbox__text}>
            [선택] 이메일 알림 수신에 동의합니다.
          </span>
        </label>

        <button className={styles.registerbox__form__button} type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
