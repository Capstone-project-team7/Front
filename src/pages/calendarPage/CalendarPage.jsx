import React, { useEffect, useState, useRef } from "react";
import styles from "./CalendarPage.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mainApi } from "@apis/mainApi";
import { toast } from "react-toastify";

export default function CalendarPage() {
  const [monthEvents, setMonthEvents] = useState([
    // {
    //   id: "1",
    //   title: "절도 1회",
    //   start: "2025-04-06",
    //   end: "2025-04-06",
    // },
    // {
    //   id: "2",
    //   title: "흡연 1회",
    //   start: "2025-04-10",
    //   end: "2025-04-10",
    // },
    // {
    //   id: "3",
    //   title: "유기 2회",
    //   start: "2025-04-04",
    //   end: "2025-04-04",
    // },
  ]);
  const calendarRef = useRef();

  const convertEventData = (apiData) => {
    const events = [];
    apiData.forEach(
      ({
        date,
        type1Count,
        type2Count,
        type3Count,
        type4Count,
        type5Count,
        type6Count,
        type7Count,
      }) => {
        if (type1Count) {
          events.push({
            title: `전도 ${type1Count}회`,
            start: date,
            end: date,
          });
        }
        if (type2Count) {
          events.push({
            title: `파손 ${type2Count}회`,
            start: date,
            end: date,
          });
        }
        if (type3Count) {
          events.push({
            title: `방화 ${type3Count}회`,
            start: date,
            end: date,
          });
        }
        if (type4Count) {
          events.push({
            title: `흡연 ${type4Count}회`,
            start: date,
            end: date,
          });
        }
        if (type5Count) {
          events.push({
            title: `유기 ${type5Count}회`,
            start: date,
            end: date,
          });
        }
        if (type6Count) {
          events.push({
            title: `절도 ${type6Count}회`,
            start: date,
            end: date,
          });
        }
        if (type7Count) {
          events.push({
            title: `폭행 ${type7Count}회`,
            start: date,
            end: date,
          });
        }
      }
    );
    return events;
  };

  const handleChangeMonth = async (arg) => {
    // 월이 변경될때 월별 이상행동 기록 api
    const currentDate = arg.view.currentStart;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formatted = `${year}-${String(month).padStart(2, "0")}`;
    try {
      const response = await mainApi.loadCalendar(formatted);
      if (response.success) {
        setMonthEvents(convertEventData(response.data));
      } else {
        toast.error(response.error || "달력 조회 실패");
        console.error(response.error);
      }
    } catch (error) {
      console.error("CalendarPage: ", error);
    }
  };

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
            locale={"ko"}
            events={monthEvents}
            datesSet={(arg) => {
              handleChangeMonth(arg);
            }}
            themeSystem="bootstrap"
          />
        </div>
      </div>
    </div>
  );
}
