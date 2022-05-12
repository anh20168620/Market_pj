import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../assets/images/banner.png";
import "../assets/css/homeScreen.css";
import { Link } from "react-router-dom";

function HomeScreen() {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      await fetch("http://localhost:3001/category/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCategorys(data.categorys);
          } else {
            console.log("Lỗi");
          }
        });
    };
    getCategory();
  }, []);

  return (
    <>
      <Header />
      <section className="Banner">
        <div className="container">
          <img src={Banner} alt="" className="banner_img" />
        </div>
      </section>
      <section className="Category">
        <div className="container container_category">
          <p className="category_title">Các danh mục hàng hóa</p>
          <ul className="category_list">
            {categorys.map((category) => (
              <Link key={category._id} to="/">
                <li className="category_item">
                  <img
                    src={`http://localhost:3001/image_category/${category.image}`}
                    alt=""
                    className="category_item_img"
                  />
                  <div className="category_item_name">{category.name}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
