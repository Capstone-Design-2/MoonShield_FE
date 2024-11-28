import React, { useState } from "react";
import "./Login.css"; // CSS 파일 가져오기

const Login = () => {
  const [formData, setFormData] = useState({
    id: "", // 수정: 키 이름을 id로 변경
    password: "",
  }); // 사용자의 입력 데이터를 저장
  const [message, setMessage] = useState(""); // 응답 메시지 표시용
  const [loading, setLoading] = useState(false); // 로딩 상태 표시

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 방지
    setLoading(true); // 로딩 상태 시작
    setMessage(""); // 메시지 초기화

    try {
      const response = await fetch("http://www.0429.site/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 요청
        },
        body: JSON.stringify(formData), // 요청 데이터
      });

      if (response.ok) {
        const data = await response.json(); // 응답 데이터를 JSON으로 변환
        setMessage(`Login Successful! Token: ${data.accessToken}`);
        console.log("Access Token:", data.accessToken);
        console.log("Token Expiry:", data.expiredTime);
      } else {
        const errorData = await response.json(); // 에러 응답을 JSON으로 변환
        setMessage(`Login Failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setMessage("Server communication error.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="login-login-container">
      <div className="login-profile-container">
        <div className="login-avatar"></div>
        <div className="login-profile-info">
          <h2>Welcome Back!</h2>
          <p>Please login to your account</p>
        </div>
      </div>
      <form className="login-login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="id">Login ID</label> {/* 수정: htmlFor 값 변경 */}
          <input
            type="text"
            id="id" // 수정: id로 변경
            name="id" // 수정: name 속성을 id로 변경
            placeholder="Enter your login ID"
            value={formData.id} // 수정: formData.loginId -> formData.id
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="login-login-button"
          disabled={loading} // 로딩 중이면 버튼 비활성화
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p>{message}</p>} {/* 응답 메시지 표시 */}
    </div>
  );
};

export default Login;
