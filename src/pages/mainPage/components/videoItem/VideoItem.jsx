import React, { useState } from "react";
import styles from "./VideoItem.module.scss";

export default function VideoItem({ time, type, thumbnail, onClick }) {
  const [isChecked, setIsChecked] = useState(false);

  const getBadgeColor = (type) => {
    const typeColors = {
      전도: "#c2d8e8",
      파손: "#f8b8c6",
      방화: "#e8b5a2",
      흡연: "#d9c2f0",
      유기: "#c6e8d9",
      절도: "#b8d8ba",
      폭행: "#f9e4ad",
    }[type];
    return typeColors ? typeColors : "#00000000";
  };

  return (
    <div className={styles.videoitem}>
      <div className={styles.videoitem__thumbnail} onClick={onClick}>
        <div
          className={styles.videoitem__thumbnail__badge}
          style={{ backgroundColor: getBadgeColor(type) }}
        >
          {type.split(" ")[0]} {/* 타입의 첫 부분만 뱃지에 표시 */}
        </div>
        <img
          src={thumbnail}
          className={styles.videoitem__thumbnail__image}
          alt={`${type} 비디오 썸네일`}
        />
      </div>
      <div className={styles.videoitem__info}>
        <label className={styles.videoitem__info__checkbox}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className={styles.videoitem__info__checkbox__box}></span>
        </label>
        <button
          className={styles.videoitem__info__title}
          onClick={onClick}
        >{`${time} ${type}`}</button>
      </div>
    </div>
  );
}
