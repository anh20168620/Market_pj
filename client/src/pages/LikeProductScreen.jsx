import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import "../assets/css/likeProductScreen.css";

function LikeProductScreen() {
  const auth = localStorage.getItem("user");

  const [message, setMessage] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/get-like-product?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setMessage(null);
        } else {
          setMessage(data.message);
        }
      });
  });

  return (
    <div>
      <Header />
      <div className="LikeProductScreen">
        <div className="container">
          <div className="container_border_noflex">
            <p className="your_post_title">Các tin đã lưu của bạn</p>

            <div className="product_container">
              {!message ? (
                product.map((item, index) => {
                  return (
                    <div className="product_display_card" key={index}>
                      <Link to={`/product-detail/${item._id}`}>
                        <div className="product_display">
                          <div className="product_display_image">
                            <img
                              src={`http://localhost:3001/image_product/${item.image[0]}`}
                              alt=""
                            />
                          </div>
                          <div className="product_display_info">
                            <div className="product_display_title">
                              {item.title}
                            </div>
                            <div className="product_display_price ">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}
                            </div>
                            <div className="product_display_time">
                              {moment(item.createdAt).format("LT L")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="title_message">{message}</div>
                  <div className="message">
                    Hãy bấm nút <i className="fa-regular fa-heart"></i> ở tin
                    đăng để lưu và xem lại sau.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikeProductScreen;
