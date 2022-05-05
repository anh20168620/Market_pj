import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/loginScreen.css";

function LoginScreen() {
  return (
    <section className="Login">
      <div className="container_login">
        <div className="container_login_form">
          <div className="login_name">Đăng Nhập</div>
          <div className="login_title">Chào mừng bạn quay trở lại</div>
          <form action="">
            <div className="login_form">
              <label className="login_label" htmlFor="">
                <span>Email</span>
              </label>
              <input
                type="email"
                className="login_input"
                placeholder="Nhập email của bạn"
              />

              <label className="login_label" htmlFor="">
                <span>Mật khẩu</span>
              </label>
              <input
                type="password"
                className="login_input"
                placeholder="Nhập mật khẩu của bạn"
              />
              <button className="btn" type="submit">
                Đăng nhập
              </button>
              <button type="button" className="btn cancelbtn">
                <Link to="/" className="header_link">
                  Cancel
                </Link>
              </button>
              <Link className="login__link" to="/register">
                Đăng ký tài khoản?
              </Link>
              <Link className="login__link" to="/">
                Bạn quên mật khẩu?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default LoginScreen;
