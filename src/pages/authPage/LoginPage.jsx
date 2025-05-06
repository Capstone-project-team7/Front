import React, { useState } from "react";
import styles from "./AuthPages.module.scss";
import AuthBox from "@components/authBox/AuthBox";
import CommonButton from "../../components/commonButton/CommonButton";
import CommonCheckbox from "../../components/commonCheckbox/CommonCheckbox";
import { useNavigate } from "react-router-dom";
import { userApi } from "@apis/userApi";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isStay, setIsStay] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(userEmail);
    console.log(userPassword);
    console.log(isStay);

    const payload = {
      user_email: userEmail,
      user_password: userPassword,
    };

    try {
      const { data } = await userApi.login({ payload });
      localStorage.setItem("user", data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className={styles.pagewrapper}>
      <AuthBox
        title="로그인"
        submitButton={
          <CommonButton
            label="로그인"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            로그인
          </CommonButton>
        }
        isLogin={true}
        contentStart="blank"
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
          <input
            className={styles.pagewrapper__form__input}
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            autoComplete="current-password"
          />
          <CommonCheckbox checked={isStay} onChange={setIsStay}>
            로그인 상태 유지
          </CommonCheckbox>

          {/* <label className={styles.pagewrapper__form__saveid}>
            <input
              type="checkbox"
              checked={isStay}
              onChange={(e) => setIsStay(e.target.checked)}
            />
            <span className={styles.pagewrapper__form__saveid__box}></span>
            <span className={styles.pagewrapper__form__saveid__text}>
              로그인 상태 유지
            </span>
          </label> */}
        </form>
      </AuthBox>
    </div>
  );
}
