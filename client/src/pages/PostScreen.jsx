import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../assets/css/postScreen.css";

function PostScreen() {
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
      <section className="PostScreen">
        <div className="container container_postScreen">
          <div className="postScreen_img">
            <label htmlFor="choose_img" className="choose_img_label">
              Chọn từ 1 đến 6 ảnh
            </label>
            <input
              type="file"
              className="input_file"
              multiple
              id="choose_img"
              name="choose_img"
            />
          </div>
          <div className="postScreen_infor">
            <select name="" id="">
              <option>Chọn danh mục tin đăng</option>
              {categorys.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostScreen;
