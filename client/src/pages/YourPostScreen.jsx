import React, { useState, useEffect } from "react";
import "../assets/css/yourPostScreen.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function YourPostScreen() {
  const auth = localStorage.getItem("user");

  const [productDisplay, setProductDisplay] = useState(null);
  const [productHidden, setProductHidden] = useState(null);

  const [totalDisplay, setTotalDisplay] = useState("");
  const [totalHidden, setTotalHidden] = useState("");
  const [messageDisplay, setMessageDisplay] = useState("");
  const [messageHidden, setMessageHidden] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/your-product-display?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalDisplay(data.total);
        } else {
          setTotalDisplay(0);
        }
      });
  }, [auth]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/your-product-hidden?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        if (dataResponse.success) {
          setTotalHidden(dataResponse.total);
        } else {
          setTotalHidden(0);
        }
      });
  }, [auth]);

  const getYourProductDisplay = async () => {
    await fetch(
      `http://localhost:3001/product/your-product-display?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductDisplay(data.productDisplay);
          setProductHidden(null);
        } else {
          setMessageDisplay(data.message);
        }
      });
  };

  const getYourProductHidden = async () => {
    fetch(
      `http://localhost:3001/product/your-product-hidden?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        if (dataResponse.success) {
          setProductHidden(dataResponse.productHidden);
          setProductDisplay(null);
        } else {
          setMessageHidden(dataResponse.message);
        }
      });
  };

  //   hidden Product
  const hiddenProduct = async (id) => {
    await fetch(
      `http://localhost:3001/product/hidden-your-product?hiddenProductId=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          getYourProductDisplay();
          setTotalDisplay(totalDisplay - 1);
          setTotalHidden(totalHidden + 1);
        }
      });
  };

  //   display Product
  const displayProduct = async (id) => {
    console.log(id);
    await fetch(
      `http://localhost:3001/product/display-your-product?displayProductId=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          getYourProductHidden();
          setTotalDisplay(totalDisplay + 1);
          setTotalHidden(totalHidden - 1);
        } else {
          console.log(data.message);
        }
      });
  };

  return (
    <div>
      <Header />
      <section className="YourPostScreen">
        <div className="container container_display">
          <p className="category_title">Quản lý tin của bạn</p>
          <div className="your_post">
            <div className="subCategory_btn" onClick={getYourProductDisplay}>
              Tin đang hiển thị({totalDisplay})
            </div>
            <div className="subCategory_btn" onClick={getYourProductHidden}>
              Tin đã ẩn({totalHidden})
            </div>
          </div>

          <div className="product_container">
            {productDisplay === null
              ? null
              : productDisplay.map((item, index) => {
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
                              {item.createdAt}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="product_diplay_hidden">
                        <div
                          className="hidden-btn"
                          onClick={() => hiddenProduct(item._id)}
                        >
                          Ẩn tin
                        </div>
                        <div className="hidden-btn">Sửa tin</div>
                      </div>
                    </div>
                  );
                })}

            {productHidden === null
              ? null
              : productHidden.map((item, index) => {
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
                              {item.createdAt}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="product_diplay_hidden">
                        <div
                          className="hidden-btn"
                          onClick={() => displayProduct(item._id)}
                        >
                          Hiện tin
                        </div>
                        <div className="hidden-btn">Sửa tin</div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default YourPostScreen;
