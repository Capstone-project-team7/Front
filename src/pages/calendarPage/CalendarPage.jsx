import React, { useEffect, useState, useRef } from "react";
import styles from "./CalendarPage.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  const [monthEvents, setMonthEvents] = useState([
    {
      id: "1",
      title: "절도 1회",
      start: "2025-04-06",
      end: "2025-04-06",
    },
    {
      id: "2",
      title: "흡연 1회",
      start: "2025-04-10",
      end: "2025-04-10",
    },
    {
      id: "3",
      title: "유기 2회",
      start: "2025-04-04",
      end: "2025-04-04",
      // 추가 커스텀 필드
      extendedProps: {
        description: "비정상적인 행동 패턴 감지",
        severity: "high",
      },
    },
  ]);
  const calendarRef = useRef();

  useEffect(() => {
    // 월이 변경될때 월별 이상행동 기록 api
  }, []);

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  return (
    <div className={styles.calendarpage}>
      <div className={styles.calendarpage__wrapper}>
        <div className={styles.calendarpage__wrapper__calendar}>
          <FullCalendar
            ref={calendarRef}
            headerToolbar={{
              left: "customPrev",
              center: "title",
              right: "customNext",
            }}
            customButtons={{
              customPrev: {
                text: "<",
                click: handlePrevClick,
              },
              customNext: {
                text: ">",
                click: handleNextClick,
              },
            }}
            titleFormat={{ year: "numeric", month: "2-digit" }}
            dayCellContent={(arg) => String(arg.date.getDate())}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={monthEvents}
            locale={"ko"}
            themeSystem="bootstrap"
          />
        </div>
      </div>
    </div>
  );
}
