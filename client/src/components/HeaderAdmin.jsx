import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/images/logo.png";
import "../assets/css/headerAdmin.css";

function HeaderAdmin() {
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
    <section className="Header">
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
                <Link to="/admin" className="header_link" onClick={goToTop}>
                  Trang chủ
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_post">
                <Link to="/admin" className="header_link">
                  Tin của bạn
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
            <div className="header_item">
              <div className="header_notice">
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
            <button class="btn btn-logout" onClick={logOut}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderAdmin;
