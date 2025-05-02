import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";
import CommonButton from "../../components/commonButton/CommonButton";
import VideoItem from "./components/videoItem/VideoItem";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCircleInfo,
  faCalendarDays,
  faSearch,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

export default function MainPage() {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalItems = 120;
  const itemsPerPage = 6;
  const pageRange = 5;
  const blockStart = Math.floor(currentPage / pageRange) * pageRange;
  const pages = Array.from({ length: pageRange }, (_, i) => blockStart + i);
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // 페이지가 변경될 때마다 해당 페이지의 아이템들을 가져옴
  useEffect(() => {
    // 페이지에 해당하는 영상 리스트 요청 api
    // 우선 더미데이터 생성 후 삽입

    const generateDummyItems = () => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // 현재 페이지에 해당하는 아이템들만 필터링
      const dummyItems = Array.from({ length: itemsPerPage }, (_, index) => {
        const itemIndex = startIndex + index;
        if (itemIndex < totalItems) {
          return {
            id: itemIndex + 1,
            time: `2025.04.29 16:00 ${itemIndex + 1}`,
            type: "절도",
          };
        }
        return null;
      }).filter(Boolean);

      setCurrentItems(dummyItems);
    };

    generateDummyItems();
  }, [currentPage]);

  const [dayFilterOpen, setDayFilterOpen] = useState(false);
  const dayFilterRef = useRef(null);
  const [range, setRange] = useState({ from: null, to: null });
  const [category, setCategory] = useState("전체");

  const handleSearch = () => {
    // 날짜 및 유형 필터링 검색 api
    console.log(range);
    console.log(category);
  };

  // 날짜 필터 바깥쪽 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dayFilterRef.current &&
        !dayFilterRef.current.contains(event.target)
      ) {
        setDayFilterOpen(false);
      }
    };

    if (dayFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dayFilterOpen]); // dayFilterOpen 상태 변경 시마다 실행

  const handleVideoClicked = (video) => {
    console.log(video);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.mainpage__top}>
        <div className={styles.mainpage__top__filter}>
          <div className={styles.mainpage__top__filter__title}>
            <FontAwesomeIcon icon={faFilter} size="2x" />
          </div>
          <div className={styles.mainpage__top__filter__date}>
            <span>날짜 선택: </span>
            <div className={styles.dateRangeDisplay} ref={dayFilterRef}>
              {range && range.from && range.to ? (
                <span className={styles.dateRangeText}>
                  {`${range.from.toLocaleDateString()} ~ ${range.to.toLocaleDateString()}`}
                </span>
              ) : (
                <span className={styles.placeholderText}>전체 기간</span>
              )}
              <button
                onClick={() => setDayFilterOpen(!dayFilterOpen)}
                className={styles.datePickerButton}
              >
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              </button>
              {dayFilterOpen && (
                <div className={styles.mainpage__top__filter__date__calendar}>
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.mainpage__top__filter__category}>
            <span>유형 선택: </span>
            <select
              className={styles.mainpage__top__filter__category__select}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="절도">절도</option>
              <option value="파손">파손</option>
              <option value="폭행">폭행</option>
              <option value="전도">전도</option>
              <option value="방화">방화</option>
              <option value="흡연">흡연</option>
              <option value="유기">유기</option>
            </select>
          </div>
          <div className={styles.mainpage__top__filter__search}>
            <CommonButton
              size="small"
              label={
                <FontAwesomeIcon icon={faSearch} size="lg"></FontAwesomeIcon>
              }
              color="primary"
              onClick={handleSearch}
            >
              검색
            </CommonButton>
          </div>
        </div>
        <div className={styles.mainpage__top__types}>
          <div className={styles.mainpage__top__types__title}>
            <FontAwesomeIcon icon={faCircleInfo} size="2x" />
          </div>
          <div className={styles.mainpage__top__types__content}>
            <div className={styles.first}>
              <div className={styles.thief}>절도</div>
              <div className={styles.break}>파손</div>
              <div className={styles.assault}>폭행</div>
              <div className={styles.falling}>전도</div>
            </div>
            <div className={styles.second}>
              <div className={styles.arson}>방화</div>
              <div className={styles.smoke}>흡연</div>
              <div className={styles.abandon}>유기</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainpage__list}>
        {currentItems.map((item) => (
          <VideoItem
            key={item.id}
            time={item.time}
            type={item.type}
            thumbnail={null}
            onClick={() => handleVideoClicked(item)}
          ></VideoItem>
        ))}
      </div>
      <div className={styles.mainpage__pagination}>
        <button
          className={styles.pageItem}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          disabled={currentPage <= 0}
        >
          {"<"}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageItem} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className={styles.pageItem}
          onClick={() =>
            setCurrentPage(Math.min(currentPage + 1, pageCount - 1))
          }
          disabled={currentPage >= pageCount - 1}
        >
          {">"}
        </button>
      </div>
      <div className={styles.mainpage__buttons}>
        <CommonButton
          icon={<FontAwesomeIcon icon={faTrash} size="1x"></FontAwesomeIcon>}
          label="선택 항목 삭제"
          color="secondary"
          size="small"
        ></CommonButton>
        <CommonButton
          icon={<FontAwesomeIcon icon={faDownload} size="1x"></FontAwesomeIcon>}
          label="선택 항목 다운로드"
          color="primary"
          size="small"
        ></CommonButton>
      </div>
    </div>
  );
}
