import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/css/emailVerify.css";
import success from "../assets/images/success.png";

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        await fetch(
          `http://localhost:3001/user/${param.id}/verify/${param.token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.success) {
              setValidUrl(true);
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error.message);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <>
      {validUrl ? (
        <div className="email_success">
          <img src={success} alt="" className="image_success" />
          <h1>Email xác thực thành công</h1>
          <Link to="/login">
            <button className="btn">Đăng nhập</button>
          </Link>
        </div>
      ) : (
        <h1>404 NOT FOUND</h1>
      )}
    </>
  );
}

export default EmailVerify;
