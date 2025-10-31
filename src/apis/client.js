import ApiResponse from "./ApiResonse";
import { TokenManager } from "../utils/tokenManager";

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

/* API 요청을 처리하는 기본 클라이언트 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - 요청 옵션
 * @param {boolean} withAuth - 인증 헤더 포함 여부
 * @returns {Promise<ApiResponse>} API 응답 객체
 */
async function fetchClient(endpoint, options = {}, withAuth = true) {
  // 기본 헤더 설정
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // 인증 토큰 추가
  if (withAuth) {
    const token = TokenManager.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      return ApiResponse.error(
        {
          message: "Authentication required",
          code: "AUTH_REQUIRED",
        },
        401
      );
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
    if (response.ok) {
      return ApiResponse.success(result.data, response.status);
    } else {
      // 401 Unauthorized - 토큰 만료 등의 문제
      if (response.status === 401) {
        TokenManager.removeToken();
      }

      return ApiResponse.error(
        {
          message: result.message || "API request failed",
          code: result.code || "API_ERROR",
          details: result.details || result,
        },
        response.status
      );
    }
  } catch (error) {
    // 네트워크 에러 또는 요청 중단
    if (error.name === "AbortError") {
      return ApiResponse.error(
        {
          message: "Request was aborted",
          code: "REQUEST_ABORTED",
        },
        0
      );
    }

    // 그 외 에러는 네트워크 문제로 간주
    console.error(`API Error (${endpoint}):`, error);
    return ApiResponse.error(
      {
        message: "Network error or server unavailable",
        code: "NETWORK_ERROR",
        originalError: error.message,
      },
      0
    );
  }
}

// HTTP 메서드별 헬퍼 함수들
export const api = {
  get: (endpoint, withAuth) => fetchClient(endpoint, {}, withAuth),

  post: (endpoint, data, withAuth) =>
    fetchClient(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      withAuth
    ),

  put: (endpoint, data, withAuth) =>
    fetchClient(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      withAuth
    ),

  delete: (endpoint, withAuth) =>
    fetchClient(
      endpoint,
      {
        method: "DELETE",
      },
      withAuth
    ),
};
