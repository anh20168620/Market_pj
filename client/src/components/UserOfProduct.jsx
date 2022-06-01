import React, { useState, useEffect } from "react";
import StarRating from "../components/StarRating";
import { Link } from "react-router-dom";

import "../assets/css/userOfProduct.css";

function UserOfProduct(props) {
  const auth = localStorage.getItem("user");

  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  useEffect(() => {
    if (props.detail.userId) {
      setUser(props.detail.userId);
    }
  }, [props.detail.userId]);

  return (
    <>
      <div className="userOfProduct">
        <div className="user_avatar_name">
          {user.avatar && (
            <img
              src={`http://localhost:3001/avatar/${user.avatar}`}
              alt=""
              className="img_avatar big-avatar"
            />
          )}

          <div className="userOfProduct_name">{user.fullName}</div>
        </div>
        <div className="user_conctact">
          <div className="user_numberphone">
            <i className="fa-solid fa-phone"></i>
            {user.numberPhone}
          </div>
          {user && user._id !== JSON.parse(auth)._id ? (
            <Link
              to={`/chat/${JSON.parse(auth)._id}/${user._id}/${product._id}`}
              className="user_chat"
            >
              <i className="fa-solid fa-message"></i>
              Chat với người bán
            </Link>
          ) : null}
        </div>
        <div className="user_rate">
          <StarRating user={user._id} />
        </div>
      </div>
    </>
  );
}

export default UserOfProduct;
