import React, { useState, useEffect } from "react";
import "../assets/css/productInfo.css";
import moment from "moment";
import "moment/locale/vi";

function ProductInfo(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  return (
    <div className="product-info">
      <div className="product_info_title">{product.title}</div>
      <div className="product_info_price">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </div>

      <label className="product_info_label">Đến từ :</label>
      <span className="product_info_brand">{product.brand}</span>
      <br />
      <label className="product_info_label">Bảo hành :</label>
      <span className="product_info_item">{product.insurance}</span>
      <br />
      <label className="product_info_label">Tình trạng :</label>
      <span className="product_info_item">{product.status}</span>
      <br />
      <label className="product_info_label">Dạng bán :</label>
      <span className="product_info_item">{product.typeOfSell}</span>
      <br />
      <label className="product_info_label">Mô tả chi tiết :</label>
      <span className="product_info_item">{product.description}</span>
      <br />
      <label className="product_info_label">Thời gian đăng :</label>
      <span className="product_info_item">
        {moment(product.createdAt).format("LT L")}
      </span>
      <br />
      <label className="product_info_label">Địa chỉ :</label>
      <span className="product_info_item">{product.address}</span>
    </div>
  );
}

export default ProductInfo;
