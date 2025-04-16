import React, { useState } from "react";
import styles from "./RegisterBox.module.scss";
import TermContent from "../../../components/termContent/TermContent";
import Modal from "../../../components/modal/Modal";


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
  const [isValid, setIsValid] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const fullEmail = `${userEmail}@${userEmailDomain}`;
  
    // 입력 유효성 검사
    if (!userEmail || !userEmailDomain || !userPassword || !userPasswordCheck || !name) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (userPassword !== userPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isValid) {
      alert("비밀번호 형식을 확인해주세요.");
      return;
    }
    if (!isAgreeTerm || !isAgreePrivacy) {
      alert("필수 약관에 동의해야 합니다.");
      return;
    }
  
    const payload = {
      user_email: fullEmail,
      user_password: userPassword,
      user_name: name,
      agreement_status: true,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok && result.status === "success") {
        alert("회원가입이 완료되었습니다!");
        console.log("회원가입 성공:", result.data);
      } else {
        alert(result.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 오류 또는 이미 가입된 이메일일 수 있습니다.");
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
            <option value="" disabled>도메인 선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
          </select>
        </div>

        <div className={`${styles.registerbox__form__inputwrapper} ${userPassword ? (isValid ? styles.match : styles.mismatch) : ""}`}>
          <input
            className={styles.registerbox__form__inputwrapper__input}
            type="password"
            placeholder="비밀번호(영문, 숫자, 특수문자 조합 8자리 이상)"
            value={userPassword}
            onChange={handleChangePassword}
            autoComplete="new-password"
          />
        </div>
        <div className={`${styles.registerbox__form__inputwrapper} ${userPasswordCheck ? userPassword === userPasswordCheck ? styles.match : styles.mismatch : ""}`}>
          <input
            className={styles.registerbox__form__inputwrapper__input}
            type="password"
            placeholder="비밀번호 확인"
            value={userPasswordCheck}
            onChange={(e) => setUserPasswordCheck(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className={styles.registerbox__form__inputwrapper}>
          <input
            className={styles.registerbox__form__inputwrapper__input}
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        {/* 약관 동의 */}
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