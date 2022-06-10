import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

import Logo from "../assets/images/logo.png";
import "../assets/css/headerAdmin.css";

function HeaderAdmin({ total, callbackShow, callbackHidden }) {
  const admin = localStorage.getItem("admin");

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="Header" onClick={callbackHidden}>
      <div className="container">
        <div className="header_up">
          <div className="header_logo">
            <Link to="/admin" onClick={goToTop}>
              <img src={Logo} alt="header_logo" />
            </Link>
          </div>
          <div className="header_list">
            <div className="header_item">
              <div className="header_home">
                <div className="header_item_icon">
                  <i className="fa-solid fa-house"></i>
                </div>
                <Link to="/admin" className="header_link" onClick={goToTop}>
                  Trang chủ
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_post">
                <div className="header_item_icon">
                  <i className="fa-solid fa-arrows-down-to-people"></i>
                </div>
                <Link to="/admin" className="header_link">
                  Gửi thông báo
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_chat">
                <Link to="/admin" className="header_link">
                  Chat
                </Link>
              </div>
            </div>
            <div className="header_item" onClick={callbackShow}>
              <div className="header_notice">
                <div className="header_item_icon">
                  <div className="NotificationBadge">
                    <NotificationBadge count={total} effect={Effect.SCALE} />
                  </div>
                  <i className="fa-regular fa-bell"></i>
                </div>
                <Link to="/admin" className="header_link">
                  Thông báo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-under">
          <div className="header_admin_title">Quản lý</div>
          <div className="header_admin">
            <div className="header_admin_email">{JSON.parse(admin).email}</div>
            <button className="btn btn-logout" onClick={logOut}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderAdmin;