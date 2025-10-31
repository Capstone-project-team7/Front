// API 응답을 위한 기본 형식
export default class ApiResponse {
  constructor(success, data = null, error = null, statusCode = 200) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  // 성공 시 ApiResponse.success()를 통해 성공 반환
  static success(data, statusCode = 200) {
    return new ApiResponse(true, data, null, statusCode);
  }

  // 실패 시 ApiResponse.error()를 통해 실패 반환
  static error(error, statusCode = 500) {
    return new ApiResponse(false, null, error, statusCode);
  }
}
