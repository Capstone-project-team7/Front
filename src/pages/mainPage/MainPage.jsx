import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";
import CommonButton from "../../components/commonButton/CommonButton";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import classNames from "classnames";

export default function MainPage() {
  // 현재 페이지의 아이템들을 저장할 상태
  const [currentItems, setCurrentItems] = useState([]);
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(0);
  // 임의의 영상 개수 설정 : 120개
  const totalItems = 120;
  // 한 페이지 당 영상 개수
  const itemsPerPage = 6;
  // 페이저에서 한번에 표시할 페이지 수
  const pageRange = 5;
  // 페이지 시작 번호 (1~5페이지의 경우 0, 6~10페이지의 경우 5)
  const blockStart = Math.floor(currentPage / pageRange) * pageRange;
  // 표시할 페이지 배열의 형태로 반환
  const pages = Array.from({ length: pageRange }, (_, i) => blockStart + i);
  // 전체 페이지 개수 계산
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // 페이지가 변경될 때마다 해당 페이지의 아이템들을 가져옴
  useEffect(() => {
    // 실제 API 호출을 대신하는 더미 데이터 생성
    // 페이지에 해당하는 영상 리스트 요청 api

    const generateDummyItems = () => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // 현재 페이지에 해당하는 아이템들만 필터링
      const dummyItems = Array.from({ length: itemsPerPage }, (_, index) => {
        const itemIndex = startIndex + index;
        if (itemIndex < totalItems) {
          return {
            id: itemIndex + 1,
            title: `아이템 ${itemIndex + 1}`,
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
    console.log(range);
    console.log(category);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dayFilterRef.current &&
        !dayFilterRef.current.contains(event.target)
      ) {
        setDayFilterOpen(false); // 바깥쪽 클릭 시 닫기
      }
    };

    if (dayFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dayFilterOpen]); // dayFilterOpen 상태 변경 시마다 실행

  return (
    <div className={styles.mainpage}>
      <div className={styles.mainpage__top}>
        <div className={styles.mainpage__top__filter}>
          <span className={styles.mainpage__top__filter__title}>필터</span>
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
                <span>📅</span>
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
          <button
            className={styles.mainpage__top__filter__search}
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
        <div className={styles.mainpage__top__types}>
          <span className={styles.mainpage__top__types__title}>타입</span>
        </div>
      </div>
      <div className={styles.mainpage__list}>
        {currentItems.map((item) => (
          <div key={item.id} className={styles.mainpage__list__item}>
            <h3>{item.title}</h3>
          </div>
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
          label="삭제"
          color="secondary"
          size="small"
        ></CommonButton>
        <CommonButton label="저장" color="primary" size="small"></CommonButton>
      </div>
    </div>
  );
}
