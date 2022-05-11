import React, { useState, useEffect } from "react";
import "../assets/css/passwordReset.css";
import { useParams } from "react-router-dom";
import Header from "./Header";

function PasswordReset() {
  const [validUrl, setValidUrl] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const param = useParams();
  const url = `http://localhost:3001/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setValidUrl(true);
          } else {
            setValidUrl(false);
          }
        });
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmid = async (e) => {
    e.preventDefault();
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setMsg(data.message);
            setErr("");
            window.location = "/login";
          } else {
            setErr(data.message);
          }
        });
    } catch (error) {
      setErr(error.message);
      setMsg("");
    }
  };

  return (
    <>
      {validUrl ? (
        <div>
          <Header />
          <div className="ForgotPassword">
            <div className="forgot_password_container">
              <form className="form_forgot_password" onSubmit={handleSubmid}>
                <span className="forgot_password_title">Nhập mật khẩu mới</span>
                <input
                  type="password"
                  required
                  className="login_input"
                  placeholder="Nhập mật khẩu mới của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {msg && <div className="success_msg">{msg}</div>}
                {err && <div className="err_msg">{err}</div>}
                <button className="btn btn-register" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
}

export default PasswordReset;
