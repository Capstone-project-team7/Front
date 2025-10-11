import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import Logo from '@assets/images/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../../stores/UserContext';
import { Link, replace, useNavigate } from 'react-router-dom';
import { userApi } from '@apis/userApi';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import InfoTooltip from '@components/infoTooltip/InfoTooltip';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const getBasePath = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 ? `/${segments[0]}` : '/';
};

export default function Header({}) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentPath = getBasePath(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  useOnClickOutside(tooltipRef, () => setIsTooltipVisible(false));

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    // 로그아웃 api 추가
    try {
      const response = await userApi.logout({ user_id: user.user_id });
      if (response.success) {
        toast.success('로그아웃됨');
        localStorage.removeItem('token');
        setUser({});
        navigate('/login');
      } else {
        toast.error(response.error.message);
        console.error(response.error.message);
      }
    } catch (error) {
      console.error('Logout: ', error);
      localStorage.removeItem('token');
      setUser({});
      navigate('/login', replace);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.open : ''}`}>
      <Link className={styles.header__logo} to={'/'}>
        <img src={Logo} className={styles.header__logo__image} />
      </Link>

      {/* 데스크톱 화면 */}
      <ul className={styles.header__menu}>
        <li className={`${styles.header__menu__item} ${currentPath === '/' ? styles.active : ''}`}>
          <Link to="/">대시보드</Link>
        </li>
        <li className={`${styles.header__menu__item} ${currentPath === '/calendar' ? styles.active : ''}`}>
          <Link to="/calendar">캘린더</Link>
        </li>
        <li className={`${styles.header__menu__item} ${currentPath === '/cctv' ? styles.active : ''}`}>
          <Link to="/cctv">CCTV 관리</Link>
        </li>
        <li className={`${styles.header__menu__item} ${currentPath === '/guide' ? styles.active : ''}`}>
          <Link to="/guide">사용가이드</Link>
        </li>
        <li className={`${styles.header__menu__item} ${currentPath === '/mypage' ? styles.active : ''}`}>
          <Link to="/mypage">마이페이지</Link>
        </li>
      </ul>
      <div className={styles.header__info}>
        <div className={styles.header__info__wrapper} ref={tooltipRef}>
          <button className={styles.header__info__wrapper__button} onClick={toggleTooltip}>
            <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
          </button>
          {isTooltipVisible && <InfoTooltip />}
        </div>
      </div>
      <div className={styles.header__logout}>
        <button className={styles.header__logout__button} onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" color="black" /> <span>로그아웃</span>
        </button>
      </div>

      {/* 태블릿, 모바일 화면 */}
      <button className={styles.header__hamburger} type="button" aria-label="메뉴 토글" onClick={handleMenuToggle}>
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faXmark} size="lg" color="black" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" color="black" />
        )}
      </button>

      <div className={styles.header__mobileNav}>
        <ul className={styles.header__mobileNav__menu}>
          <li className={`${styles.header__menu__item} ${currentPath === '/' ? styles.active : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              대시보드
            </Link>
          </li>
          <li className={`${styles.header__menu__item} ${currentPath === '/calendar' ? styles.active : ''}`}>
            <Link to="/calendar" onClick={() => setIsMenuOpen(false)}>
              캘린더
            </Link>
          </li>
          <li className={`${styles.header__menu__item} ${currentPath === '/cctv' ? styles.active : ''}`}>
            <Link to="/cctv" onClick={() => setIsMenuOpen(false)}>
              CCTV 관리
            </Link>
          </li>
          <li className={`${styles.header__menu__item} ${currentPath === '/guide' ? styles.active : ''}`}>
            <Link to="/guide" onClick={() => setIsMenuOpen(false)}>
              사용가이드
            </Link>
          </li>
          <li className={`${styles.header__menu__item} ${currentPath === '/mypage' ? styles.active : ''}`}>
            <Link to="/mypage" onClick={() => setIsMenuOpen(false)}>
              마이페이지
            </Link>
          </li>
        </ul>
        <div className={`${styles.header__logout} ${styles.mobile}`}>
          <button className={styles.header__logout__button} onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" color="black" /> <span>로그아웃</span>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className={styles.overlay} onClick={handleMenuToggle}></div>}

      {loading && (
        <div className={styles.loader}>
          <ClipLoader color="#2c3e50" loading={loading} size={50} />
        </div>
      )}
    </header>
  );
}
