import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

function UserDetailOfProduct() {
  const [user, setUser] = useState();
  const param = useParams();

  useEffect(() => {
    const getUserById = async () => {
      await fetch(`http://localhost:3001/user/get-user-by-id/${param.userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          }
        });
    };
    getUserById();
  }, [param]);
  return (
    <div>
      <Header />
      <section className="Infor_user">
        <div className="container">
          <div className="container_border">
            <div className="avata_user">
              <p className="infor_user-title">Thông tin cá nhân chi tiết</p>
              <img
                src={`http://localhost:3001/avatar/${user?.avatar}`}
                alt=""
                className="avatar_infor"
              />

              <div className="user_rate">
                <StarRating user={user?._id} />
              </div>
            </div>
            <div className="infor_user">
              <div className="infor_user_list">
                <div className="infor_user_item">
                  <span className="infor_user_lable">Họ và tên</span>
                  <div className="infor_user_detail">
                    <span>{user?.fullName}</span>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Số điện thoại</span>
                  <div className="infor_user_detail">
                    <span>{user?.numberPhone}</span>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Email</span>
                  <div className="infor_user_detail">
                    <span>{user?.email}</span>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Địa chỉ</span>
                  <div className="infor_user_detail">
                    <span>{user?.address}</span>
                  </div>
                </div>

                <div className="infor_user_item">
                  <span className="infor_user_lable">Ngày sinh</span>
                  <div className="infor_user_detail">
                    <span> {user?.birthday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetailOfProduct;
