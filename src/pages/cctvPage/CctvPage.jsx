import React, { useRef, useState } from "react";
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

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CctvPage() {
  const [colDefs, setColDefs] = useState([
    { headerName: "CCTV 이름", field: "cctvName", flex: 1 },
    { headerName: "IP 주소", field: "ipAddress", flex: 1 },
    { headerName: "CCTV ID", field: "cctvId", flex: 1 },
    { headerName: "스트림 경로", field: "stream", flex: 1 },
    { headerName: "매장 이름", field: "storeName", flex: 1 },
    {
      headerName: "활성화 상태",
      field: "isActive",
      flex: 1,
      cellRenderer: (params) => {
        return params.value ? "active" : "inactive";
      },
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
    {
      cctvName: "CCTV1",
      ipAddress: "123.456.789.123",
      cctvId: "admin",
      stream: "/main",
      storeName: "이마트24",
      isActive: true,
    },
    {
      cctvName: "CCTV2",
      ipAddress: "123.456.789.123",
      cctvId: "admin",
      stream: "/sub1",
      storeName: "이마트24",
      isActive: false,
    },
    {
      cctvName: "CCTV3",
      ipAddress: "123.456.789.123",
      cctvId: "admin",
      stream: "/sub2",
      storeName: "이마트24",
      isActive: false,
    },
    {
      cctvName: "CCTV4",
      ipAddress: "123.456.789.123",
      cctvId: "admin",
      stream: "/sub3",
      storeName: "이마트24",
      isActive: false,
    },
    {
      cctvName: "CCTV5",
      ipAddress: "123.456.789.123",
      cctvId: "admin",
      stream: "/sub4",
      storeName: "이마트24",
      isActive: false,
    },
  ]);

  const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
    accentColor: "#2C3E50",
    backgroundColor: "#fefbf6",
    browserColorScheme: "light",
    columnBorder: false,
    foregroundColor: "#2C3E50",
    headerBackgroundColor: "#fefbf6",
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

  const handleEditCCTV = (item) => {
    // 수정 로직 추가
    //console.log(item);
    navigate("edit", { state: { cctv: item } });
  };

  const handleAddCCTV = () => {
    // 추가 로직 추가
    navigate("edit");
  };

  const handleDeleteCCTV = () => {
    // 삭제 로직 추가
    console.log(selectedRows);
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
