const API_BASE_URL = "http://localhost:8080/api/v1";

async function fetchClient(endpoint, options = {}, withAuth = true) {
  // 기본 헤더 설정
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // 인증 토큰 추가
  if (withAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  // URL 구성
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    // fetch 요청 실행
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const result = await response.json();
    // 응답이 ok가 아니면 에러 처리
    if (response.ok && result.message === "success") {
      return { result, status: response.status };
    } else {
      console.error("****", result.message);
      return { status: response.status };
    }
    // JSON 응답 파싱
  } catch (error) {
    console.error("API 요청 실패: ", error);
  }
}

// HTTP 메서드별 헬퍼 함수들
export const api = {
  get: (endpoint, withAuth = true) => fetchClient(endpoint, {}, withAuth),

  post: (endpoint, data, withAuth = true) =>
    fetchClient(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      withAuth
    ),

  put: (endpoint, data, withAuth = true) =>
    fetchClient(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      withAuth
    ),

  delete: (endpoint, withAuth = true) =>
    fetchClient(
      endpoint,
      {
        method: "DELETE",
      },
      withAuth
    ),
};
