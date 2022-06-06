import React, { useState, useEffect } from "react";
import "../assets/css/yourPostScreen.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

function YourPostScreen() {
  const auth = localStorage.getItem("user");

  const [productDisplay, setProductDisplay] = useState(null);
  const [productHidden, setProductHidden] = useState(null);

  const [totalDisplay, setTotalDisplay] = useState("");
  const [totalHidden, setTotalHidden] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/product-waiting?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((res) => res.json())
      .then((dataResponse) => {
        if (dataResponse.success) {
        } else {
          console.log(dataResponse.message);
        }
      });
  }, [auth]);

  const getYourProductDisplay = async () => {
    setMessage("");
    await fetch(
      `http://localhost:3001/product/your-product-display?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.productDisplay.length !== 0) {
          setProductDisplay(data.productDisplay);
          setProductHidden(null);
          setMessage("");
        } else if (data.success && data.productDisplay.length === 0) {
          setMessage("Không tìm thấy sản phẩm nào phù hợp");
          setProductDisplay(null);
          setProductHidden([]);
        }
      });
  };

  const getYourProductHidden = async () => {
    setMessage("");
    fetch(
      `http://localhost:3001/product/your-product-hidden?userId=${
        JSON.parse(auth)._id
      }`
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        if (dataResponse.success && dataResponse.productHidden.length !== 0) {
          setProductHidden(dataResponse.productHidden);
          setProductDisplay(null);
          setMessage("");
        } else if (
          dataResponse.success &&
          dataResponse.productHidden.length === 0
        ) {
          setMessage("Không tìm thấy sản phẩm nào phù hợp");
          setProductDisplay([]);
          setProductHidden(null);
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
          getYourProductHidden();
          setTotalDisplay(totalDisplay + 1);
          setTotalHidden(totalHidden - 1);
        } else {
          console.log(data.message);
        }
      });
  };

  // product waiting
  // const getYourProductWaiting = () => {
  //   setMessage("");
  //   fetch(
  //     `http://localhost:3001/product/product-waiting?userId=${
  //       JSON.parse(auth)._id
  //     }`
  //   )
  //     .then((res) => res.json())
  //     .then((dataResponse) => {
  //       if (dataResponse.success && dataResponse.productWaiting.length !== 0) {
  //         setProductDisplay(null);
  //         setProductHidden(null);
  //         setMessage("");
  //       } else if (
  //         dataResponse.success &&
  //         dataResponse.productWaiting.length === 0
  //       ) {
  //         setMessage("Không tìm thấy sản phẩm nào phù hợp");
  //         setProductDisplay([]);
  //         setProductHidden([]);
  //       }
  //     });
  // };
  return (
    <div>
      <Header />
      <section className="YourPostScreen">
        <div className="container">
          <div className="container_border_noflex">
            <p className="your_post_title">Quản lý tin của bạn</p>
            <div className="your_post">
              <div className="subCategory_btn" onClick={getYourProductDisplay}>
                Tin đang hiển thị({totalDisplay})
              </div>
              <div className="subCategory_btn" onClick={getYourProductHidden}>
                Tin đã ẩn({totalHidden})
              </div>
            </div>

            <div className="product_container">
              {productDisplay === null ? (
                <div className="not_found_message">{message}</div>
              ) : (
                productDisplay.map((item, index) => {
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

                      <div className="product_diplay_hidden">
                        <div
                          className="hidden-btn"
                          onClick={() => hiddenProduct(item._id)}
                        >
                          Ẩn tin
                        </div>
                        <Link
                          to={`/update-post/${item._id}`}
                          className="hidden-btn"
                        >
                          Sửa tin
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}

              {productHidden === null ? (
                <div className="not_found_message">{message}</div>
              ) : (
                productHidden.map((item, index) => {
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

                      <div className="product_diplay_hidden">
                        <div
                          className="hidden-btn"
                          onClick={() => displayProduct(item._id)}
                        >
                          Hiện tin
                        </div>
                        <Link
                          to={`/update-post/${item._id}`}
                          className="hidden-btn"
                        >
                          Sửa tin
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default YourPostScreen;
