import React, { useState } from "react";
import Header from "../components/Header";
import "../assets/css/changePasswordScreen.css";

function ChangePasswordScreen() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const auth = localStorage.getItem("user");

  const changePassword = async () => {
    await fetch(
      `http://localhost:3001/user/change-password/${JSON.parse(auth)._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          newPassword,
          confirmNewPassword,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
          setErr("");
          setTimeout(() => {
            localStorage.clear();
            window.location = "/login";
          }, 1000);
        } else {
          setErr(data.message);
        }
      });
  };

  return (
    <>
      <Header />
      <section className="ChangePasword">
        <div className="container_change_pasword">
          <div className="change_password_form">
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
              <span>Mật khẩu mới</span>
            </label>
            <input
              type="password"
              className="register_input"
              placeholder="Nhập mật khẩu mới của bạn"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="" className="register_label">
              <span>Nhập lại mật khẩu mới </span>
            </label>
            <input
              type="password"
              className="register_input"
              placeholder="Nhập lại mật khẩu mới của bạn"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {msg && <div className="success_msg">{msg}</div>}
            {err && <div className="err_msg">{err}</div>}
            <button onClick={changePassword} className="btn" type="button">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePasswordScreen;
