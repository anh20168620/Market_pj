import React, { useState, useEffect } from "react";
import "../assets/css/productInfo.css";
import moment from "moment";
import "moment/locale/vi";

function ProductInfo(props) {
  const [product, setProduct] = useState({});
  const auth = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  const [like, setLike] = useState(false);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  useEffect(() => {
    auth &&
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
    auth &&
      (await fetch(
        `http://localhost:3001/product/handle-like-product?userId=${
          JSON.parse(auth)._id
        }&productId=${product._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLike(true);
          } else {
            setLike(false);
          }
        }));
  };

  return (
    <div className="product-info">
      <div className="product_info_title">
        {product.title}
        {auth && (
          <div className="like_btn_detail" onClick={handleLike}>
            {!like ? (
              <i className="fa-regular fa-heart"></i>
            ) : (
              <div className="liked_btn">
                <i className="fa-solid fa-heart"></i>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="product_info_price">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </div>

      <label className="product_info_label">?????n t??? :</label>
      <span className="product_info_brand">{product.brand}</span>
      <br />
      <label className="product_info_label">B???o h??nh :</label>
      <span className="product_info_item">{product.insurance}</span>
      <br />
      <label className="product_info_label">T??nh tr???ng :</label>
      <span className="product_info_item">{product.status}</span>
      <br />
      <label className="product_info_label">D???ng b??n :</label>
      <span className="product_info_item">{product.typeOfSell}</span>
      <br />
      <label className="product_info_label">M?? t??? chi ti???t :</label>
      <span className="product_info_item">{product.description}</span>
      <br />
      <label className="product_info_label">Th???i gian ????ng :</label>
      <span className="product_info_item">
        {moment(product.createdAt).format("LT L")}
      </span>
      <br />
      <label className="product_info_label">?????a ch??? :</label>
      <span className="product_info_item">{product.address}</span>

      {product.userId?._id !== JSON.parse(auth)?._id && !admin ? (
        <div className="product_report">
          <div className="btn btn_report" onClick={props.callbackShow}>
            B??o c??o tin n??y
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductInfo;
