import React, { useEffect, useState } from "react";
import styles from "./CctvPage.module.scss";
import CommonButton from "../../components/commonButton/CommonButton";
import { useLocation, useNavigate } from "react-router-dom";
import { cctvApi } from "../../apis/cctvApi";

export default function CctvEditPage() {
  const location = useLocation();
  const { cctv } = location.state || {};

  const [cctvId, setCctvId] = useState();
  const [cctvName, setCctvName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [cctvAdmin, setCctvAdmin] = useState("");
  const [stream, setStream] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (cctv) {
      setCctvId(cctv.cctvId);
      setCctvName(cctv.cctvName);
      setIpAddress(cctv.ipAddress);
      setCctvAdmin(cctv.cctvAdmin);
      setStream(cctv.stream);
      setStoreName(cctv.storeName);
    }
  }, [cctv]);

  const handleSaveCctv = async (e) => {
    e.preventDefault();

    if (location.pathname.endsWith("add")) {
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
    } else if (location.pathname.endsWith("edit")) {
      try {
        await cctvApi.updateCctv({
          cctvId: null,
          user_id: null,
          cctv_name: cctvName,
          ip_address: ipAddress,
          cctv_admin: cctvId,
          cctv_path: stream,
          cctv_password: password,
        });
      } catch (error) {
        alert("cctv 수정에 실패하였습니다. 다시 시도해주세요.");
      }
    }
  };
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
              <label>CCTV Admin</label>
              <input
                className={styles.input}
                value={cctvAdmin}
                onChange={(e) => setCctvAdmin(e.target.value)}
                placeholder="CCTV Admin (기본값은 admin입니다.)"
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
