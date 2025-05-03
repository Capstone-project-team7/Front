import React, { useEffect, useState } from "react";
import styles from "./CctvPage.module.scss";
import CommonButton from "../../components/commonButton/CommonButton";
import { useLocation } from "react-router-dom";

export default function CctvEditPage() {
  const location = useLocation();
  const { cctv } = location.state || {};

  const [cctvName, setCctvName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [cctvId, setCctvId] = useState("");
  const [stream, setStream] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    if (cctv) {
      setCctvName(cctv.cctvName);
      setIpAddress(cctv.ipAddress);
      setCctvId(cctv.cctvId);
      setStream(cctv.stream);
      // password 처리?
      setStoreName(cctv.storeName);
    }
  }, [cctv]);

  const handleSaveCctv = () => {};
  return (
    <div className={styles.cctvpage}>
      <div className={styles.cctvpage__wrapper}>
        <span className={styles.cctvpage__wrapper__title}>CCTV 관리</span>
        <div className={styles.cctvpage__wrapper__content}>
          <span className={styles.cctvpage__wrapper__content__subtitle}>
            CCTV 정보 입력
          </span>
          <div className={styles.cctvpage__wrapper__content__inner}>
            <div className={styles.row}>
              <label>CCTV 이름</label>
              <input
                className={styles.input}
                value={cctvName}
                onChange={(e) => setCctvName(e.target.value)}
                placeholder="이름"
              ></input>
            </div>
            <div className={styles.row}>
              <label>IP 주소</label>
              <input
                className={styles.input}
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="IP 주소"
              ></input>
            </div>
            <div className={styles.row}>
              <label>CCTV ID</label>
              <input
                className={styles.input}
                value={cctvId}
                onChange={(e) => setCctvId(e.target.value)}
                placeholder="CCTV ID (admin)"
              ></input>
            </div>
            <div className={styles.row}>
              <label>스트림 경로</label>
              <input
                className={styles.input}
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                placeholder="스트림 경로"
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
            <CommonButton
              label="저장"
              size="large"
              color="primary"
              onClick={handleSaveCctv}
            ></CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
