import React, { useEffect, useState } from "react";
import styles from "./MenuItem.module.scss";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faCalendar,
  faVideo,
  faFileLines,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export default function MenuItem({ label, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const icontype = {
    Home: faHouseChimney,
    Calendar: faCalendar,
    CCTV: faVideo,
    Guide: faFileLines,
    MyPage: faGear,
  }[label];

  return (
    <li className={`${styles.menuitem} ${isActive ? styles.selected : ""}`}>
      <Link className={styles.menuitem__link} to={to}>
        <span className={styles.menuitem__link__icon}>
          <FontAwesomeIcon icon={icontype} />
        </span>
        {label}
      </Link>
    </li>
  );
}
