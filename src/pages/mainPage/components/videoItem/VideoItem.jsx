import React, { useState } from "react";
import styles from "./VideoItem.module.scss";

export default function VideoItem({ time, type, thumbnail, onClick }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.videoitem}>
      <img
        src="https://placehold.co/360x160"
        alt="https://placehold.co/360x160"
        className={styles.videoitem__thumbnail}
        onClick={onClick}
      ></img>
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
