import React, { useState, useRef } from "react";
import styles from "./CalendarPage.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { mainApi } from "@apis/mainApi";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function CalendarPage() {
  const [monthEvents, setMonthEvents] = useState([]);
  const calendarRef = useRef();
  const [loading, setLoading] = useState(false);

  const convertEventData = (apiData) => {
    const events = [];
    const typeColors = {
      type1: "#c2d8e8",
      type2: "#f8b8c6",
      type3: "#e8b5a2",
      type4: "#d9c2f0",
      type5: "#c6e8d9",
      type6: "#b8d8ba",
      type7: "#f9e4ad",
    };

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
            backgroundColor: typeColors.type1,
            borderColor: typeColors.type1,
          });
        }
        if (type2Count) {
          events.push({
            title: `파손 ${type2Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type2,
            borderColor: typeColors.type2,
          });
        }
        if (type3Count) {
          events.push({
            title: `방화 ${type3Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type3,
            borderColor: typeColors.type3,
          });
        }
        if (type4Count) {
          events.push({
            title: `흡연 ${type4Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type4,
            borderColor: typeColors.type4,
          });
        }
        if (type5Count) {
          events.push({
            title: `유기 ${type5Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type5,
            borderColor: typeColors.type5,
          });
        }
        if (type6Count) {
          events.push({
            title: `절도 ${type6Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type6,
            borderColor: typeColors.type6,
          });
        }
        if (type7Count) {
          events.push({
            title: `폭행 ${type7Count}회`,
            start: date,
            end: date,
            backgroundColor: typeColors.type7,
            borderColor: typeColors.type7,
          });
        }
      }
    );
    return events;
  };

  const handleChangeMonth = async (arg) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
            dayMaxEventRows={false}
            height={"auto"}
            initialView="dayGridMonth"
            locale={"ko"}
            events={monthEvents}
            datesSet={(arg) => {
              handleChangeMonth(arg);
            }}
            themeSystem="bootstrap"
          />
          {loading && (
            <div className={styles.loader}>
              <ClipLoader color="#2c3e50" loading={loading} size={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
