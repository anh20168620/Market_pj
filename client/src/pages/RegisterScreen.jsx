import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/registerScreen.css";

function RegisterScreen() {
  return (
    <section className="Register">
      <div className="container_register">
        <div className="container_register_form">
          <div className="register_name">Đăng ký</div>
          <div className="register_title">Đăng ký tài khoản ngay</div>
          <form action="">
            <div className="register_form">
              <label htmlFor="" className="register_label">
                <span>Tên đầy đủ </span>
              </label>
              <input
                type="text"
                className="register_input"
                placeholder="Nhập tên của bạn"
              />

              <label htmlFor="" className="register_label">
                <span>Số điện thoại </span>
              </label>
              <input
                type="number"
                className="register_input"
                placeholder="Nhập số điện thoại của bạn"
              />

              <label htmlFor="" className="register_label">
                <span>Email </span>
              </label>
              <input
                type="email"
                className="register_input"
                placeholder="Nhập email của bạn"
              />

              <label htmlFor="" className="register_label">
                <span>Mật khẩu</span>
              </label>
              <input
                type="password"
                className="register_input"
                placeholder="Nhập mật khẩu của bạn"
              />

              <label htmlFor="" className="register_label">
                <span>Nhập lại mật khẩu</span>
              </label>
              <input
                type="password"
                className="register_input"
                placeholder="Nhập lại mật khẩu của bạn"
              />

              <button className="btn btn-register" type="submit">
                Đăng Ký
              </button>
              <span className="register_span">
                Bạn đã có tài khoản ?
                <Link className="register__link" to="/login">
                  Đăng nhập
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterScreen;
