import React, { useContext, useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { UserContext } from "@stores/UserContext";
import CommonButton from "@components/commonButton/CommonButton";

export default function EditPage() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleChangeInfo = () => {
    // 개인정보 수정 api
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <div className={styles.mypage}>
      <div className={styles.mypage__wrapper}>
        <span className={styles.mypage__wrapper__title}>마이 페이지</span>
        <div className={styles.mypage__wrapper__content}>
          <span className={styles.mypage__wrapper__content__subtitle}>
            개인정보 수정
          </span>
          <div className={styles.mypage__wrapper__content__inner}>
            <div className={styles.row}>
              <label>사용자 이메일</label>
              <span className={styles.gray}>
                {user ? user.email : "*******@gmail.com"}
              </span>
            </div>
            <div className={styles.row}>
              <label>이름</label>
              <input
                className={styles.input}
                defaultValue={user ? user.name : ""}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
              ></input>
            </div>
            <div className={styles.row}>
              <label>현재 비밀번호</label>
              <input
                className={styles.input}
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              ></input>
            </div>
            <div className={styles.row}>
              <label>변경할 비밀번호</label>
              <input
                className={styles.input}
                placeholder="변경할 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className={styles.row}>
              <label>이름</label>
              <input
                className={styles.input}
                placeholder="비밀번호 확인"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              ></input>
            </div>
            <CommonButton
              label="개인정보 수정"
              size="large"
              color="primary"
              onClick={handleChangeInfo}
            ></CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
