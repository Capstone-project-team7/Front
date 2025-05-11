import React, { useContext, useState } from "react";
import styles from "./AuthPages.module.scss";
import AuthBox from "@components/authBox/AuthBox";
import CommonButton from "../../components/commonButton/CommonButton";
import CommonCheckbox from "../../components/commonCheckbox/CommonCheckbox";
import { useNavigate } from "react-router-dom";
import { userApi } from "@apis/userApi";
import { toast } from "react-toastify";
import { UserContext } from "../../stores/UserContext";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isStay, setIsStay] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.login({
        user_email: userEmail,
        user_password: userPassword,
      });

      if (response.success) {
        toast.success("로그인 성공");
        localStorage.setItem("token", response.data.token);
        setUser({
          userid: response.data.user_id,
          name: response.data.user_name,
          email: userEmail,
          currentStorage: response.data.used_space,
          maxStorage: response.data.total_space,
          isAlarm: true,
        });
        response.data.first_login ? navigate("/tutorial") : navigate("/");
      } else {
        toast.error(response.error.message);
        console.error(response.error.message);
      }
    } catch (error) {
      console.error("LoginPage: ", error);
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
