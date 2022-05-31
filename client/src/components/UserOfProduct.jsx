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

  const createChat = async () => {
    await fetch("http://localhost:3001/chat/new-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: JSON.parse(auth)._id,
        receiverId: user._id,
        productId: product._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
        } else {
        }
      });
  };

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
          <Link
            to={`/chat/${JSON.parse(auth)._id}/${user._id}/${product._id}`}
            className="user_chat"
            onClick={createChat}
          >
            <i className="fa-solid fa-message"></i>
            Chat với người bán
          </Link>
        </div>
        <div className="user_rate">
          <StarRating user={user._id} />
        </div>
      </div>
    </>
  );
}

export default UserOfProduct;
