const API_BASE_URL = "http://localhost:8080/api/v1";

// API 응답을 위한 기본 형식
class ApiResponse {
  constructor(success, data = null, error = null, statusCode = 200) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  static success(data, statusCode = 200) {
    return new ApiResponse(true, data, null, statusCode);
  }

  static error(error, statusCode = 500) {
    return new ApiResponse(false, null, error, statusCode);
  }
}

const TokenManager = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    if (token) {
      localStorage.setItem("token", token);
    }
  },

  removeToken() {
    localStorage.removeItem("token");
  },
};

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
      toast.error("토큰이 만료되어 로그인 페이지로 이동합니다.");
      window.location.href = "/login";
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

    // 응답 Json으로 변환
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
