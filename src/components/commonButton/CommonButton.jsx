import React from "react";
import styles from "./CommonButton.module.scss";

function CommonButton({ label, size = "large", color = "primary", onClick }) {
  return (
    <button
      className={`${styles.commonbutton} ${styles[size]} ${styles[color]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CommonButton;
