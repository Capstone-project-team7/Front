import React, { useState, useContext, useEffect } from "react";
import styles from "./MyPage.module.scss";
import CommonButton from "@components/commonButton/CommonButton";
import { UserContext } from "@stores/UserContext";
import StorageBar from "./components/stoargeBar/StorageBar";
import { useNavigate } from "react-router-dom";
import CommonToggle from "../../components/commonToggle/CommonToggle";

export default function MyPage() {
  const { user, setUser } = useContext(UserContext);
  const [isAlarm, setIsAlarm] = useState(false);
  const navigate = useNavigate();

  const handleChangeInfo = () => {
    navigate("edit");
  };

  const handleAlarm = () => {
    setIsAlarm(!isAlarm);
    // 알림 설정 변경 api
  };

  useEffect(() => {
    if (user) {
      setIsAlarm(user.isAlarm);
    }
  }, [user]);

  return (
    <div className={styles.mypage}>
      <div className={styles.mypage__wrapper}>
        <span className={styles.mypage__wrapper__title}>마이 페이지</span>
        <div className={styles.mypage__wrapper__content}>
          <span className={styles.mypage__wrapper__content__subtitle}>
            개인정보 관리
          </span>
          <div className={styles.mypage__wrapper__content__inner}>
            <div className={styles.row}>
              <label>사용자 이메일</label>
              <span className={styles.gray}>{user ? user.email : "null"}</span>
            </div>
            <div className={styles.row}>
              <label>이름</label>
              <span className={styles.gray}>{user ? user.name : "null"}</span>
            </div>
            <CommonButton
              label="개인정보 수정"
              size="small"
              color="primary"
              onClick={handleChangeInfo}
            ></CommonButton>
          </div>
        </div>
        <div className={styles.mypage__wrapper__content}>
          <span className={styles.mypage__wrapper__content__subtitle}>
            알람 설정
          </span>
          <div className={styles.mypage__wrapper__content__inner}>
            <div className={styles.row}>
              <label>이메일 수신 여부</label>
              <CommonToggle checked={isAlarm} onToggle={() => handleAlarm()} />
            </div>
          </div>
        </div>
        <div className={styles.mypage__wrapper__content}>
          <span className={styles.mypage__wrapper__content__subtitle}>
            잔여 저장 공간
          </span>
          <div className={styles.mypage__wrapper__content__inner}>
            <StorageBar
              total={user ? user.maxStorage / 1024 / 1024 / 1024 : 10}
              used={user ? user.currentStorage / 1024 / 1024 / 1024 : 0}
            />
          </div>
        </div>
        <div className={styles.mypage__wrapper__content}>
          <span className={styles.mypage__wrapper__content__subtitle}>
            회원 탈퇴
          </span>
          <div className={styles.mypage__wrapper__content__inner}>
            <div className={styles.row}>
              <label>회원 탈퇴</label>
              <CommonButton
                label="회원 탈퇴"
                size="small"
                color="primary"
                onClick={() => handleWithdraw}
              ></CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
