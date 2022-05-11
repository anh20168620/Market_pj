import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import "../assets/css/registerScreen.css";

function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const collectData = async () => {
    let result = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        numberPhone,
        email,
        password,
        confirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result.success) {
      setErr("");
      setMsg(result.message);
    } else {
      setErr(result.message);
      setMsg("");
    }
  };

  return (
    <>
      <Header />
      <section className="Register">
        <div className="container_register">
          <div className="container_register_form">
            <div className="register_name">Đăng ký</div>
            <div className="register_title">Đăng ký tài khoản ngay</div>
            <form action="">
              <div className="register_form">
                <label htmlFor="" className="register_label">
                  <span>Họ và tên</span>
                </label>
                <input
                  type="text"
                  className="register_input"
                  placeholder="Nhập tên của bạn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <label htmlFor="" className="register_label">
                  <span>Số điện thoại</span>
                </label>
                <input
                  type="number"
                  className="register_input"
                  placeholder="Nhập số điện thoại của bạn"
                  value={numberPhone}
                  onChange={(e) => setNumberPhone(e.target.value)}
                />

                <label htmlFor="" className="register_label">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  className="register_input"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="" className="register_label">
                  <span>Mật khẩu</span>
                </label>
                <input
                  type="password"
                  className="register_input"
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="" className="register_label">
                  <span>Nhập lại mật khẩu </span>
                </label>
                <input
                  type="password"
                  className="register_input"
                  placeholder="Nhập lại mật khẩu của bạn"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {msg && <div className="success_msg">{msg}</div>}
                {err && <div className="err_msg">{err}</div>}
                <button
                  onClick={collectData}
                  className="btn btn-register"
                  type="button"
                >
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
    </>
  );
}

export default RegisterScreen;
