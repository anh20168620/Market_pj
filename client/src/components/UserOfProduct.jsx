import React, { useState, useEffect } from "react";
import "../assets/css/userOfProduct.css";

function UserOfProduct(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (props.detail.userId) {
      setUser(props.detail.userId);
    }
  }, [props.detail.userId]);

  return (
    <>
      <div className="userOfProduct">
        <img
          src={`http://localhost:3001/avatar/${user.avatar}`}
          alt=""
          className="img_avatar big-avatar"
        />
        <div className="userOfProduct_name">{user.fullName}</div>
      </div>
    </>
  );
}

export default UserOfProduct;
