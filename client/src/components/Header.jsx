import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/css/header.css";

function Header() {
  return (
    <section className="Header">
      <div className="container">
        <div className="header_up">
          <div className="header_logo">
            <Link to="/">
              <img src={Logo} alt="header_logo" />
            </Link>
          </div>
          <div className="header_list">
            <div className="header_item">
              <div className="header_home">
                <Link to="/" className="header_link">
                  Trang chủ
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_post">
                <Link to="/" className="header_link">
                  Tin của bạn
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_chat">
                <Link to="/" className="header_link">
                  Chat
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_notice">
                <Link to="/" className="header_link">
                  Thông báo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-under">
          <div className="header_search">
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Tìm kiếm trên Chợ Việt"
            />
            <button className="btn btn-search">Tìm kiếm</button>
          </div>
          <div className="header_user">
            <div className="btn header_user_login">
              <Link to="/login" className="header_link">
                Đăng nhập
              </Link>
            </div>
            <div className="btn header_user_post">
              <Link to="/" className="header_link">
                Đăng tin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
