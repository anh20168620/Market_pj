import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import Header from "../components/Header";

import "../assets/css/updateUser.css";

function UpdateUserScreen() {
  const auth = localStorage.getItem("user");

  const [fullName, setFullName] = useState(JSON.parse(auth).fullName);
  const [numberPhone, setNumberPhone] = useState(JSON.parse(auth).numberPhone);
  const [birthday, setBirthday] = useState(JSON.parse(auth).birthday);
  const [address, setAddress] = useState(JSON.parse(auth).address);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const refreshPage = () => {
    window.location.reload(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/user/update-profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userId: JSON.parse(auth)._id,
        fullName: fullName,
        numberPhone: numberPhone,
        birthday: birthday,
        address: address,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
          setErr("");
          setTimeout(() => {
            setMsg("");
          }, 2000);

          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setErr(data.message);
          setMsg("");
        }
      });
  };

  return (
    <>
      <Header />
      <section className="Infor_user">
        <div className="container">
          <div className="container_border">
            <div className="infor_user">
              <p className="infor_user-title">Thông tin cá nhân</p>

              <form action="" className="form-update">
                <div className="infor_user_list">
                  <div className="infor_user_item">
                    <span className="infor_user_lable">Họ và tên</span>
                    <input
                      className="infor_user_detail input_color"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="infor_user_item">
                    <span className="infor_user_lable">Số điện thoại</span>
                    <input
                      className="infor_user_detail input_color"
                      value={numberPhone}
                      type="number"
                      onChange={(e) => {
                        setNumberPhone(e.target.value);
                      }}
                    />
                  </div>

                  <div className="infor_user_item">
                    <span className="infor_user_lable">Email</span>
                    <div className="infor_user_detail">
                      <span>{JSON.parse(auth).email}</span>
                    </div>
                  </div>

                  <div className="infor_user_item">
                    <span className="infor_user_lable">Địa chỉ</span>
                    <input
                      className="infor_user_detail input_color"
                      value={address}
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>

                  <div className="infor_user_item">
                    <span className="infor_user_lable">Ngày sinh</span>
                    <CurrencyFormat
                      format="##/##/####"
                      mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
                      placeholder="DD/MM/YYYY"
                      className="infor_user_detail input_color"
                      value={birthday}
                      type="text"
                      onChange={(e) => {
                        setBirthday(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {msg && <div className="success_msg">{msg}</div>}
                {err && <div className="err_msg">{err}</div>}

                <button className="btn" onClick={(e) => handleUpdate(e)}>
                  Lưu thay đổi
                </button>
                <button className="btn btn-refresh" onClick={refreshPage}>
                  Làm mới
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateUserScreen;
