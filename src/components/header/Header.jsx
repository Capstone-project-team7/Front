import React, { useContext } from "react";
import styles from "./Header.module.scss";
import Logo from "@assets/images/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../stores/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const Logout = () => {
    // 로그아웃 api 추가
    setUser(null);
    localStorage.removeItem("user");
    // 로그인 페이지로 navigate
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <Link className={styles.header__logo} to={"/"}>
        <img src={Logo} className={styles.header__logo__image} />
      </Link>
      {user ? (
        <div className={styles.header__profile}>
          <button className={styles.header__profile__logout} onClick={Logout}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="lg"
              color="black"
            />{" "}
            <span>로그아웃</span>
          </button>
          <div className={styles.header__profile__hello}>
            <FontAwesomeIcon icon={faCircleUser} size="2x" color="black" />{" "}
            <div>
              <span className={styles.header__profile__hello__name}>
                {user.name}
              </span>
              <span>님 안녕하세요!</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
