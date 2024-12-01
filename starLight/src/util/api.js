export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken");
  const expiredTime = localStorage.getItem("accessExpiredTime");

  // 토큰 만료 확인
  if (expiredTime && new Date().getTime() > Number(expiredTime)) {
    console.error("Access Token has expired. Redirecting to login...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessExpiredTime");
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const response = await fetch(endpoint, config);

  if (!response.ok) {
    if (response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessExpiredTime");
      window.location.href = "/login";
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};
