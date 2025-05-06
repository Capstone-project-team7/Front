import React, { useState } from "react";
import styles from "./AuthPages.module.scss";
import AuthBox from "@components/authBox/AuthBox";
import Modal from "../../components/modal/Modal";
import TermContent from "../../components/termContent/TermContent";
import CommonButton from "../../components/commonButton/CommonButton";
import CommonCheckbox from "../../components/commonCheckbox/CommonCheckbox";
import { userApi } from "@apis/userApi.js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fullEmail = `${userEmail}@${userEmailDomain}`;

    if (
      !userEmail ||
      !userEmailDomain ||
      !userPassword ||
      !userPasswordCheck ||
      !name
    ) {
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
      await userApi.register({ payload });
      alert("회원가입이 완료되었습니다. 로그인 후 사용해주세요.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류: ", error);
      alert("서버 오류로 회원가입에 실패하였습니다. 다시 시도해주세요.");
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
          <CommonButton
            label="회원가입"
            size="large"
            color="primary"
            onClick={handleRegister}
          />
        }
        isLogin={false}
        contentStart="full"
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
          <CommonCheckbox checked={isAgreeTerm} onChange={setIsAgreeTerm}>
            {
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
            }
          </CommonCheckbox>

          <CommonCheckbox checked={isAgreePrivacy} onChange={setIsAgreePrivacy}>
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
          </CommonCheckbox>
          <CommonCheckbox checked={isAgreeAlarm} onChange={setIsAgreeAlarm}>
            <span className={styles.pagewrapper__form__checkbox__text}>
              [선택] 이메일 알림 수신에 동의합니다.
            </span>
          </CommonCheckbox>
        </form>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TermContent isClickLeft={isClickLeft}></TermContent>
        </Modal>
      </AuthBox>
    </div>
  );
}
