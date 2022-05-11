import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/userMenu.css";

function UserMenu() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <section className="UserMenu">
        <ul className="user_menu">
          <li className="user_menu_item header_link">
            <Link className="header_link" to="/infor-user">
              Thông tin tài khoản
            </Link>
          </li>
          <hr />
          <li className="user_menu_item">
            <Link className="header_link" to="">
              Tin yêu thích
            </Link>
          </li>
          <hr />
          <li className="user_menu_item">
            <button onClick={logOut} className="btn btn-logout">
              Đăng xuất
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}

export default UserMenu;
