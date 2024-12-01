import Cookies from "js-cookie"; // js-cookie로 쿠키 읽기

export const apiClient = async (endpoint, options = {}) => {
  const token = Cookies.get("accessToken"); // 쿠키에서 Access Token 가져오기

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Access Token 추가
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(endpoint, config);

  if (!response.ok) {
    // 요청 실패 시 에러 던지기
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
