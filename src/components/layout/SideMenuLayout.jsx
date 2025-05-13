import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";
import Tutorial from "../../pages/tutorialPage/components/Tutorial";

export default function SideMenuLayout() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const [showTutorial, setShowTutorial] = useState(false);

  const tutorialSteps = [
    {
      target: "#homepage-menu",
      title: "홈페이지",
      description:
        "감지된 이상행동 리스트를 확인할 수 있어요. 날짜, 유형 필터링을 통해 원하는 영상을 검색할 수 있어요.",
    },
    {
      target: "#calendarpage-menu",
      title: "달력",
      description:
        "달력을 통해 해당 달의 이상행동 발생 여부를 한 눈에 확인할 수 있어요.",
    },
    {
      target: "#cctvpage-menu",
      title: "CCTV 관리",
      description:
        "등록한 CCTV를 확인할 수 있어요. CCTV를 추가하거나, 수정, 삭제할 수 있어요.",
    },
    {
      target: "#guidepage-menu", // CSS 선택자 - 사용자 프로필
      title: "사용 가이드",
      description: "자세한 사용 가이드를 확인할 수 있어요.",
    },
    {
      target: "#mypage-menu", // CSS 선택자 - 사용자 프로필
      title: "마이 페이지",
      description:
        "회원 정보 및 알림 설정, 잔여 저장 공간을 확인할 수 있어요. 회원 정보 수정, 탈퇴도 가능해요.",
    },
  ];

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem("tutorialCompleted");
    if (!tutorialCompleted) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem("tutorialCompleted", "true");
    setShowTutorial(false);
  };

  return (
    <div className={styles.layoutwrapper}>
      <Header />
      <main className={styles.layoutwrapper__sidemenu}>
        <SideMenu />
        <Outlet />
      </main>
      <Tutorial
        steps={tutorialSteps}
        isEnabled={showTutorial}
        onComplete={handleTutorialComplete}
        routePath="/tutorial"
      />
    </div>
  );
}
