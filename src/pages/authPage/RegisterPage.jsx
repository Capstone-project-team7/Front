import React, { useState } from "react";
import styles from "./AuthPages.module.scss";
import AuthBox from "@components/authBox/AuthBox";
import Modal from "../../components/modal/Modal";
import TermContent from "../../components/termContent/TermContent";

export default function RegisterPage() {
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
  const [isValid, setIsValid] = useState(false);

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

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleChangePassword = (e) => {
    const pw = e.target.value;
    setUserPassword(pw);
    setIsValid(validatePassword(pw));
  };

  return (
    <div className={styles.pagewrapper}>
      <AuthBox
        title="회원가입"
        submitButton={
          <button
            className={styles.pagewrapper__form__button}
            onClick={handleRegister}
          >
            회원가입
          </button>
        }
        isLogin={false}
      >
        <form className={styles.pagewrapper__form}>
          <div className={styles.pagewrapper__form__email}>
            <input
              className={styles.pagewrapper__form__email__id}
              type="text"
              placeholder="이메일"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              autoComplete="username"
            />
            @
            <select
              className={styles.pagewrapper__form__email__domain}
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

          <div
            className={`${styles.pagewrapper__form__inputwrapper} ${
              userPassword ? (isValid ? styles.match : styles.mismatch) : ""
            }`}
          >
            <input
              className={styles.pagewrapper__form__inputwrapper__input}
              type="password"
              placeholder="비밀번호(영문, 숫자, 특수문자 조합 8자리 이상)"
              value={userPassword}
              onChange={handleChangePassword}
              autoComplete="new-password"
            />
          </div>
          <div
            className={`${styles.pagewrapper__form__inputwrapper} ${
              userPasswordCheck
                ? userPassword === userPasswordCheck
                  ? styles.match
                  : styles.mismatch
                : ""
            }`}
          >
            <input
              className={styles.pagewrapper__form__inputwrapper__input}
              type="password"
              placeholder="비밀번호 확인"
              value={userPasswordCheck}
              onChange={(e) => setUserPasswordCheck(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className={styles.pagewrapper__form__inputwrapper}>
            <input
              className={styles.pagewrapper__form__inputwrapper__input}
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <label className={styles.pagewrapper__form__checkbox}>
            <input
              type="checkbox"
              checked={isAgreeTerm}
              onChange={(e) => setIsAgreeTerm(e.target.checked)}
            />
            <span className={styles.pagewrapper__form__checkbox__box}></span>
            <span className={styles.pagewrapper__form__checkbox__text}>
              [필수]{" "}
              <button
                type="button"
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
          <label className={styles.pagewrapper__form__checkbox}>
            <input
              type="checkbox"
              checked={isAgreePrivacy}
              onChange={(e) => setIsAgreePrivacy(e.target.checked)}
            />
            <span className={styles.pagewrapper__form__checkbox__box}></span>
            <span className={styles.pagewrapper__form__checkbox__text}>
              [필수]{" "}
              <button
                type="button"
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
          <label className={styles.pagewrapper__form__checkbox}>
            <input
              type="checkbox"
              checked={isAgreeAlarm}
              onChange={(e) => setIsAgreeAlarm(e.target.checked)}
            />
            <span className={styles.pagewrapper__form__checkbox__box}></span>
            <span className={styles.pagewrapper__form__checkbox__text}>
              [선택] 이메일 알림 수신에 동의합니다.
            </span>
          </label>
        </form>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TermContent isClickLeft={isClickLeft}></TermContent>
        </Modal>
      </AuthBox>
    </div>
  );
}
