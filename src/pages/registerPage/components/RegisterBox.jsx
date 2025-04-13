import React, { useState } from "react";
import styles from "./RegisterBox.module.scss";
import TermContent from "../../../components/termContent/TermContent";
import Modal from "../../../components/modal/Modal";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickLeft, setIsClickLeft] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    const fullEmail = `${userEmail}@${userEmailDomain}`;

    // email 입력 체크
    // 패스워드 일치 체크
    // 패스워드 기준 만족 체크
    // 이름 입력 체크
    // 필수 동의 체크

    try {
      // 회원가입 api 추가
    } catch (err) {
      // 이미 가입된 이메일일 경우 오류
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
            [필수]{" "}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsClickLeft(true);
              }}
            >
              최종이용자 이용약관
            </button>
            에 동의합니다.
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
            [필수]{" "}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsClickLeft(false);
              }}
            >
              개인정보 수집 및 이용
            </button>
            에 동의합니다.
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TermContent isClickLeft={isClickLeft}></TermContent>
      </Modal>
    </div>
  );
}
