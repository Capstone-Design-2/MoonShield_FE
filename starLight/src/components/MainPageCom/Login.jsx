import React from "react";
import "./Login.css"; // CSS 파일 가져오기

const Login = () => {
  return (
    <div className="login-login-container">
      <div className="login-profile-container">
        <div className="login-avatar"></div>
        <div className="login-profile-info">
          <h2>Welcome Back!</h2>
          <p>Please login to your account</p>
        </div>
      </div>
      <form className="login-login-form">
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
