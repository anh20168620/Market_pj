import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/vi";
import "../assets/css/productCard.css";

function ProductCard({ image, title, price, time, address, productId }) {
  const auth = localStorage.getItem("user");
  const [like, setLike] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/check-like-product?userId=${
        JSON.parse(auth)._id
      }&productId=${productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLike(true);
        } else {
          setLike(false);
        }
      });
  }, [auth, productId]);

  const handleLike = async () => {
    await fetch(
      `http://localhost:3001/product/handle-like-product?userId=${
        JSON.parse(auth)._id
      }&productId=${productId}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLike(true);
        } else {
          setLike(false);
        }
      });
  };
  return (
    <>
      <div className="product_item">
        <Link to={`/product-detail/${productId}`} className="product_detail">
          <img src={image} alt="" className="product_image" />
          <div className="product_title">{title}</div>
          <div className="product_price_like">
            <span className="product_price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </span>
          </div>
          <div className="product_info">
            <div className="product_time">{moment(time).fromNow()}</div>
            <div className="product_address">{address}</div>
          </div>
        </Link>
        <div className="like_btn" onClick={handleLike}>
          {!like ? (
            <i className="fa-regular fa-heart"></i>
          ) : (
            <div className="liked_btn">
              <i className="fa-solid fa-heart"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
