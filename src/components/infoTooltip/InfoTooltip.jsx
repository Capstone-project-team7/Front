import React from 'react';
import styles from './InfoTooltip.module.scss';
import { types } from '../../stores/Constants';

export default function InfoTooltip() {
  return (
    <div className={styles.tooltip__wrapper}>
      <div className={styles.tooltip__title}>이상행동 유형</div>
      <div className={styles.tooltip__grid}>
        {types.map((type) => (
          <div key={type.name} className={`${styles.typeItem} ${styles[type.className]}`}>
            {type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
