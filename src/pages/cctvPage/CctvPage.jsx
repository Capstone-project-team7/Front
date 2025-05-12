import React, { useEffect, useRef, useState } from "react";
import styles from "./CctvPage.module.scss";
import CommonButton from "@components/commonButton/CommonButton";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  iconSetQuartzLight,
} from "ag-grid-community";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { cctvApi } from "../../apis/cctvApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CctvPage() {
  const [activatedRow, setActivatedRow] = useState(null);

  const [colDefs, setColDefs] = useState([
    { headerName: "CCTV 이름", field: "cctvName", flex: 1 },
    { headerName: "IP 주소", field: "ipAddress", flex: 1 },
    { headerName: "스트림 경로", field: "stream", flex: 1 },
    { headerName: "매장 이름", field: "storeName", flex: 1 },
    {
      headerName: "활성화 상태",
      field: "isActive",
      cellStyle: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      cellRenderer: (params) => {
        const row = params.data;
        const isActive = row.is_active;
        return (
          <button
            className={`${styles.activatebtn} ${
              isActive ? styles.active : styles.inactive
            }`}
            onClick={() => handleActivateCCTV(row)}
          >
            {row.is_active ? "스트리밍 중" : "스트리밍 시작"}
          </button>
        );
      },
      sortable: true,
      filter: false,
    },
    {
      headerName: "수정",
      field: "actions",
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellRenderer: (params) => {
        const row = params.data;
        return (
          <CommonButton
            label="수정"
            size="small"
            color="secondary"
            onClick={() => handleEditCCTV(row)}
          />
        );
      }, // 커스텀 렌더러 사용
      width: 150,
      sortable: false,
      filter: false,
    },
  ]);

  const [rowData, setRowData] = useState([
    // {
    //   cctvId: 1,
    //   cctvName: "CCTV1",
    //   ipAddress: "123.456.789.123",
    //   cctvAdmin: "admin",
    //   stream: "/main",
    //   storeName: "이마트24",
    //   isActive: true,
    // },
    // {
    //   cctvId: 2,
    //   cctvName: "CCTV2",
    //   ipAddress: "123.456.789.123",
    //   cctvAdmin: "admin",
    //   stream: "/sub1",
    //   storeName: "이마트24",
    //   isActive: false,
    // },
    // {
    //   cctvId: 3,
    //   cctvName: "CCTV3",
    //   ipAddress: "123.456.789.123",
    //   cctvAdmin: "admin",
    //   stream: "/sub2",
    //   storeName: "이마트24",
    //   isActive: false,
    // },
    // {
    //   cctvId: 4,
    //   cctvName: "CCTV4",
    //   ipAddress: "123.456.789.123",
    //   cctvAdmin: "admin",
    //   stream: "/sub3",
    //   storeName: "이마트24",
    //   isActive: false,
    // },
    // {
    //   cctvId: 5,
    //   cctvName: "CCTV5",
    //   ipAddress: "123.456.789.123",
    //   cctvAdmin: "admin",
    //   stream: "/sub4",
    //   storeName: "이마트24",
    //   isActive: false,
    // },
  ]);

  const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
    fontFamily: "pretendard, sans-serif",
    accentColor: "#2C3E50",
    backgroundColor: "#ffffff",
    browserColorScheme: "light",
    columnBorder: false,
    foregroundColor: "#2C3E50",
    headerBackgroundColor: "#ffffff",
    headerFontSize: 14,
    headerFontWeight: 600,
    headerTextColor: "#666666",
    rowBorder: false,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
  });

  const defaultColDef = {
    sortable: true,
    filter: false,
    resizable: true,
  };

  const gridRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  //초기 로드시 cctv 목록 가져오기.
  useEffect(async () => {
    try {
      const response = await cctvApi.getCctvs();
      if (response.success) {
        setRowData(response.data.cctvs);
      } else {
        toast(response.message);
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleActivateCCTV = async (item) => {
    // 이미 활성화된 CCTV인지 확인
    const isCurrentlyActive = item.isActive;

    // 현재 모든 rowData를 복사
    const updatedRowData = rowData.map((row) => {
      if (row.cctv_id === item.cctv_id) {
        // 클릭한 항목의 상태를 토글 (이미 활성화된 항목이면 비활성화, 아니면 활성화)
        return {
          ...row,
          is_active: !isCurrentlyActive,
        };
      } else {
        // 다른 항목들은 항상 비활성화
        return {
          ...row,
          is_active: false,
        };
      }
    });

    // TODO: 활성화 상태 변경 API 추가
    try {
      if (isCurrentlyActive) {
        // 비활성화 API
        const response = null; // TODO
        if (response.success) {
          toast.success(`${item.cctv_name} 비활성화됨`);
          setRowData(updatedRowData);
          setActivatedRow(null);
        } else {
          toast.error(response.message || "CCTV 비활성화 실패");
          console.error(response.message);
        }
      } else {
        // 활성화 API
        const response = null; // TODO
        if (response.success) {
          toast.success(`${item.cctv_name} 활성화됨`);
          setRowData(updatedRowData);
          setActivatedRow(item.cctv_id);
        } else {
          toast.error(response.message || "CCTV 활성화 실패");
          console.error(response.message);
        }
      }
    } catch (error) {
      console.error("CCTV Page: ", error);
    }
  };
  const handleEditCCTV = (item) => {
    navigate("edit", { state: { cctv: item } });
  };

  const handleAddCCTV = () => {
    navigate("add");
  };

  const handleDeleteCCTV = async (e) => {
    e.preventDefault();

    console.log(selectedRows);
    const cctvs = selectedRows.map((item) => item.cctv_name);

    const confirmDelete = window.confirm("선택한 CCTV를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await cctvApi.deleteCctv({ cctvs });
        if (response.success) {
          toast.success("CCTV 삭제 성공");
          window.location.reload();
        } else {
          toast.error(response.message);
          console.error(response.message);
        }
      } catch (error) {
        console.error("CCTV Page: ", error);
      }
    }
  };

  return (
    <div className={styles.cctvpage}>
      <div className={styles.cctvpage__wrapper}>
        <span className={styles.cctvpage__wrapper__title}>CCTV 관리</span>
        <div className={styles.cctvpage__wrapper__content}>
          <span className={styles.cctvpage__wrapper__content__subtitle}>
            등록된 CCTV
          </span>

          <div className={styles.cctvpage__wrapper__content__buttons}>
            <CommonButton
              label="선택 항목 삭제"
              icon={<FontAwesomeIcon icon={faTrash} size="1x" />}
              size="small"
              color="secondary"
              onClick={() => handleDeleteCCTV()}
            />
            <CommonButton
              label="CCTV 추가"
              icon={<FontAwesomeIcon icon={faAdd} size="1x" />}
              size="small"
              color="primary"
              onClick={handleAddCCTV}
            />
          </div>
          <div
            className={styles.cctvpage__wrapper__content__table}
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              localeText={{
                noRowsToShow: "등록된 CCTV가 없습니다",
              }}
              rowSelection={{
                mode: "multiRow",
                checkboxes: true,
                headerCheckbox: true,
                enableClickSelection: false,
              }}
              onSelectionChanged={() => {
                const selectedNodes = gridRef.current.api.getSelectedNodes();
                const selectedData = selectedNodes.map((node) => node.data);
                setSelectedRows(selectedData);
              }}
              theme={myTheme} // 테마 API 사용
            />
          </div>
        </div>
      </div>
    </div>
  );
}
