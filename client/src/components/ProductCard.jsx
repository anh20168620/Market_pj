import React from "react";
import moment from "moment";
import "../assets/css/productCard.css";

function ProductCard({ image, title, price, time, address }) {
  return (
    <div className="product_item">
      <img src={image} alt="" className="product_image" />
      <div className="product_title">{title}</div>
      <div className="product_price">{price}</div>
      <div className="product_time">{moment(time).fromNow()}</div>
      <div className="product_address">{address}</div>
    </div>
  );
}

export default ProductCard;
