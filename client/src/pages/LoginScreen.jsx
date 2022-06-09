import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/loginScreen.css";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    await fetch("http://localhost:3001/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setErr("");
          localStorage.setItem("admin", JSON.stringify(data.admin));
          alert(data.message);

          navigate("/admin");
        } else {
          fetch("http://localhost:3001/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user));
                alert(result.message);
                navigate("/");
              } else {
                setErr(result.message);
              }
            });
        }
      });
  };

  return (
    <>
      <Header />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="login_label" htmlFor="">
                  <span>Mật khẩu</span>
                </label>
                <input
                  type="password"
                  className="login_input"
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                {err && <div className="err_msg">{err}</div>}
                <button onClick={handleLogin} className="btn" type="button">
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
                <Link className="login__link" to="/forgot-password">
                  Bạn quên mật khẩu?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default LoginScreen;
