import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    name: "",
    email: "",
  });

  // State to handle response and errors
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the signup API
      const response = await fetch(
        "http://www.0429.site:8081/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        // Success case
        setResponseMessage(data.message);
        setErrorMessage(""); // Clear any previous errors
      } else {
        // Failure case
        setErrorMessage(data.message || "회원가입에 실패했습니다.");
        setResponseMessage(""); // Clear any previous success message
      }
    } catch (error) {
      setErrorMessage("서버와 통신 중 문제가 발생했습니다.");
      setResponseMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-header">회원가입</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <label htmlFor="loginId">아이디:</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={formData.loginId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="signup-button" type="submit">
          회원가입
        </button>
      </form>

      {/* Display success or error messages */}
      {responseMessage && (
        <p className="signup-message success">{responseMessage}</p>
      )}
      {errorMessage && <p className="signup-message error">{errorMessage}</p>}
    </div>
  );
};

export default Signup;
