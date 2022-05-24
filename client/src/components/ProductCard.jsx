import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/vi";
import "../assets/css/productCard.css";

function ProductCard({ image, title, price, time, address, productId }) {
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
            {/* <i className="fa-solid fa-ellipsis"></i> */}
            <div className="product_address">{address}</div>
          </div>
        </Link>
        <i className="fa-regular fa-heart"></i>
      </div>
    </>
  );
}

export default ProductCard;
