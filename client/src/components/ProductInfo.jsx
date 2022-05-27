import React, { useState, useEffect } from "react";
import "../assets/css/productInfo.css";
import moment from "moment";
import "moment/locale/vi";

function ProductInfo(props) {
  const [product, setProduct] = useState({});
  const auth = localStorage.getItem("user");
  const [like, setLike] = useState(false);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/check-like-product?userId=${
        JSON.parse(auth)._id
      }&productId=${product._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLike(true);
        } else {
          setLike(false);
        }
      });
  }, [auth, product._id]);

  const handleLike = async () => {
    await fetch(
      `http://localhost:3001/product/handle-like-product?userId=${
        JSON.parse(auth)._id
      }&productId=${product._id}`,
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
    <div className="product-info">
      <div className="product_info_title">
        {product.title}
        <div className="like_btn_detail" onClick={handleLike}>
          {!like ? (
            <i className="fa-regular fa-heart"></i>
          ) : (
            <div className="liked_btn">
              <i className="fa-solid fa-heart"></i>
            </div>
          )}
        </div>
      </div>
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
