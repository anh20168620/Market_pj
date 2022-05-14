import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/inforUserScreen.css";

function InforUserScreen() {
  const auth = localStorage.getItem("user");

  const [avatar, setAvatar] = useState("");
  const [srcAvatar, setSrcAvatar] = useState(
    `http://localhost:3001/avatar/${JSON.parse(auth).avatar}`
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  useEffect(() => {
    // upload avatar
    const uploadAvatar = async () => {
      try {
        if (avatar) {
          const formData = new FormData();
          formData.append("avatar", avatar);
          await fetch(
            `http://localhost:3001/upload/avatar/${JSON.parse(auth)._id}`,
            {
              method: "POST",
              credentials: "include",
              body: formData,
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                const authUpdate = localStorage.getItem("user");
                setSrcAvatar(
                  `http://localhost:3001/avatar/${
                    JSON.parse(authUpdate).avatar
                  }`
                );
              }
            });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    uploadAvatar();
  }, [avatar, auth]);
  return (
    <>
      <Header />
      <section className="Infor_user">
        <div className="container">
          <div className="container_border">
            <div className="avata_user">
              <p className="infor_user-title">Thông tin cá nhân</p>
              <img src={srcAvatar} alt="" className="avatar_infor" />

              <div className="change_avatar">
                <label
                  htmlFor="user-avarta-input"
                  className="btn btn_change-avatar"
                >
                  Đổi ảnh đại diện
                </label>
                <input
                  type="file"
                  name="user-avarta-input"
                  id="user-avarta-input"
                  className="input_file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="infor_user">
              <div className="infor_user_list">
                <div className="infor_user_item">
                  <span className="infor_user_lable">Họ và tên</span>
                  <div className="infor_user_detail">
                    <span>{JSON.parse(auth).fullName}</span>
                    <Link to="/user-update" className="infor_user_btn">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Số điện thoại</span>
                  <div className="infor_user_detail">
                    <span>{JSON.parse(auth).numberPhone}</span>
                    <Link to="/user-update" className="infor_user_btn">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Email</span>
                  <div className="infor_user_detail">
                    <span>{JSON.parse(auth).email}</span>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Địa chỉ</span>
                  <div className="infor_user_detail">
                    <span>{JSON.parse(auth).address}</span>
                    <Link to="/user-update" className="infor_user_btn">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Ngày sinh</span>
                  <div className="infor_user_detail">
                    <span> {JSON.parse(auth).birthday}</span>
                    <Link to="/user-update" className="infor_user_btn">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Mật khẩu</span>
                  <div className="infor_user_detail">
                    <span>********</span>
                    <Link to="/change-password" className="infor_user_btn">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InforUserScreen;
