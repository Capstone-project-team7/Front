import React, { useState } from "react";
import styles from "./TutorialPage.module.scss";
import CommonButton from "../../components/commonButton/CommonButton";
import meerkatImage from "@assets/images/meerkat.png";
import { useNavigate } from "react-router-dom";

export default function TutorialPage() {
  const [isOpen, setIsOpen] = useState(true);

  const [cctvId, setCctvId] = useState();
  const [cctvName, setCctvName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [cctvAdmin, setCctvAdmin] = useState("");
  const [stream, setStream] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");

  const navigate = useNavigate();

  const handleSaveCctv = async (e) => {
    e.preventDefault();

    try {
      await cctvApi.createCctv({
        user_id: null,
        cctv_name: cctvName,
        ip_address: ipAddress,
        cctv_admin: cctvId,
        cctv_path: stream,
        cctv_password: password,
      }); // CCTV ID????
      navigate("/cctv");
    } catch (error) {
      alert("cctv 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.tutorialpage}>
      <div className={styles.tutorialpage__welcome}>
        {/* <img
          src={meerkatImage}
          className={styles.tutorialpage__welcome__image}
        ></img> */}
        <div className={styles.tutorialpage__welcome__text}>
          <div className={styles.tutorialpage__welcome__text__title}>
            <span>미어캣 AI와 함께</span>
            <span> 새로운 여정을</span>
            <span>시작하세요!</span>
          </div>
          <span className={styles.tutorialpage__welcome__text__subtitle}>
            더 빠르고 스마트한 탐색을 지금 바로 경험해보세요.
          </span>
        </div>
      </div>
      <div className={styles.tutorialpage__cctv}>
        <span className={styles.tutorialpage__cctv__title}>CCTV 등록</span>
        <div className={styles.tutorialpage__cctv__content}>
          <span className={styles.tutorialpage__cctv__content__subtitle}>
            CCTV 정보 입력
          </span>
          <div className={styles.tutorialpage__cctv__content__inner}>
            <div className={styles.tutorialpage__cctv__content__inner__left}>
              <div className={styles.row}>
                <label>CCTV 이름</label>
                <input
                  className={styles.input}
                  value={cctvName}
                  onChange={(e) => setCctvName(e.target.value)}
                  placeholder="이름 (ex: 현관 앞)"
                ></input>
              </div>
              <div className={styles.row}>
                <label>IP 주소</label>
                <input
                  className={styles.input}
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="IP 주소 (ex: 123.123.123.123)"
                ></input>
              </div>
              <div className={styles.row}>
                <label>CCTV Admin</label>
                <input
                  className={styles.input}
                  value={cctvAdmin}
                  onChange={(e) => setCctvAdmin(e.target.value)}
                  placeholder="CCTV Admin (ex: admin)"
                ></input>
              </div>
              <CommonButton
                label="저장"
                size="large"
                color="primary"
                onClick={handleSaveCctv}
              ></CommonButton>
            </div>
            <div className={styles.tutorialpage__cctv__content__inner__right}>
              <div className={styles.row}>
                <label>스트림 경로</label>
                <input
                  className={styles.input}
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  placeholder="스트림 경로 (ex: /main)"
                ></input>
              </div>
              <div className={styles.row}>
                <label>비밀번호</label>
                <input
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="CCTV 비밀번호"
                ></input>
              </div>
              <div className={styles.row}>
                <label>매장 이름</label>
                <input
                  className={styles.input}
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="매장 이름"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
