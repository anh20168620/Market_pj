import React, { useState } from "react";
import { Link } from "react-router-dom";

import UserMenu from "../components/UserMenu";
import Logo from "../assets/images/logo.png";
import "../assets/css/header.css";

function Header() {
  const auth = localStorage.getItem("user");
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="Header">
      <div className="container">
        <div className="header_up">
          <div className="header_logo">
            <Link to="/" onClick={goToTop}>
              <img src={Logo} alt="header_logo" />
            </Link>
          </div>
          <div className="header_list">
            <div className="header_item">
              <div className="header_home">
                <Link to="/" className="header_link" onClick={goToTop}>
                  Trang chủ
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_post">
                <Link to="/your-post" className="header_link">
                  Tin của bạn
                </Link>
              </div>
            </div>
            <div className="header_item">
              <div className="header_chat">
                <Link to="/chat" className="header_link">
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <Link
                to={`/product-search/${searchInput}`}
                className="btn btn-search"
              >
                Tìm kiếm
              </Link>
            )}
          </div>
          <div className="header_user">
            {auth ? (
              <>
                <img
                  src={`http://localhost:3001/avatar/${
                    JSON.parse(auth).avatar
                  }`}
                  alt=""
                  className="img_avatar"
                />
                <div className=" header_user_login">
                  <button onClick={() => setShow(!show)} className="user_name">
                    <div>{JSON.parse(auth).fullName}</div>
                  </button>
                  {show && <UserMenu />}
                </div>
              </>
            ) : (
              <div className="btn header_user_login">
                <Link to="/login" className="header_link">
                  Đăng nhập
                </Link>
              </div>
            )}
            <div className="btn header_user_post">
              <Link to="/post" className="header_link">
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
