import "../assets/css/forgotPassword.css";
import React, { useState } from "react";
import Header from "./Header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmid = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => res.json())

        .then((data) => {
          if (data.success) {
            setMsg(data.message);
            setErr("");
          } else {
            setErr(data.message);
          }
        });
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="ForgotPassword">
        <div className="forgot_password_container">
          <form className="form_forgot_password" onSubmit={handleSubmid}>
            <span className="forgot_password_title">Quên mật khẩu</span>
            <input
              type="email"
              required
              className="login_input"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {msg && <div className="success_msg">{msg}</div>}
            {err && <div className="err_msg">{err}</div>}
            <button className="btn btn-register" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
