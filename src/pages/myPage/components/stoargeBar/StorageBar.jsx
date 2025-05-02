import React, { useState } from "react";
import styles from "./StorageBar.module.scss";

export default function StorageBar({ total, used }) {
  const usedPercentage = Math.min((used / total) * 100);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={styles.bar}>
      <div
        className={styles.bar__container}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <div
          className={styles.bar__container__used}
          style={{ width: `${usedPercentage}%` }}
        ></div>
        {isTooltipVisible && (
          <div className={styles.bar__container__tooltip}>
            {used}GB 사용 / {total}GB 중 {usedPercentage.toFixed(1)}%
          </div>
        )}
      </div>
      <div className={styles.bar__labels}>
        <span className={styles.bar__labels__left}>0GB</span>
        {used !== 0 && (
          <span
            className={styles.bar__labels__left}
            style={{ left: `${usedPercentage - 5}%` }}
          >
            {used}GB
          </span>
        )}
        <span className={styles.bar__labels__right}>{total}GB</span>
      </div>
    </div>
  );
}
