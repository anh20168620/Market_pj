import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../assets/css/postScreen.css";

function PostScreen() {
  const [categorys, setCategorys] = useState([]);
  const [subCategorys, setSubCategorys] = useState([]);

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

  const handleCategorySelect = async (e) => {
    // console.log(e.target.value);
    await fetch(`http://localhost:3001/sub-category/get/${e.target.value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setSubCategorys(data.subCategory);
        } else {
          console.log("Lỗi");
        }
      });
  };

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
            <select className="select" onChange={handleCategorySelect}>
              <option hidden>Chọn danh mục tin đăng</option>
              {categorys.map((category) => (
                <option
                  className="option"
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <select className="select">
              <option hidden>Chọn loại sản phẩm</option>
              {subCategorys.map((subCategory) => (
                <option
                  className="option"
                  key={subCategory._id}
                  value={subCategory._id}
                >
                  {subCategory.name}
                </option>
              ))}
            </select>
            <label htmlFor="" className="register_label">
              <span>Tiêu đề và mô tả :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập tiêu đề"
              // value={}
              // onChange={}
            />
            <label htmlFor="" className="register_label">
              <span>Giá :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập giá sản phẩm"
              // value={}
              // onChange={}
            />

            <label htmlFor="" className="register_label">
              <span>Hãng(thương hiệu) :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập tiêu đề"
              // value={}
              // onChange={}
            />

            <label htmlFor="" className="register_label">
              <span>Bảo hành :</span>
            </label>
            <select className="select_infor">
              <option hidden></option>
              <option>Còn bảo hành</option>
              <option>Hết bảo hành</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Tình trạng :</span>
            </label>
            <select className="select_infor">
              <option hidden></option>
              <option>Mới</option>
              <option>Đã sử dụng(chưa sửa chữa)</option>
              <option>Đã sử dụng(qua sửa chữa)</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Dạng bán :</span>
            </label>
            <select className="select_infor">
              <option hidden></option>
              <option>Cá nhân</option>
              <option>Bán chuyên</option>
            </select>

            <textarea
              className="textarea"
              cols="82"
              rows="8"
              placeholder="Viết tiếng việt có dấu
            -Tình trang
            -Thời gian sử dụng
            -Lỗi sẳn phẩm
            -Phụ kiện đi kèm
            -Màu săc
            -các thông tin khác về sản phẩm
            -Các phương thức liên hệ với người bán
            "
            ></textarea>

            <label htmlFor="" className="register_label">
              <span>Địa chỉ :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Địa chỉ"
              // value={}
              // onChange={}
            />
            <button className="btn" type="button">
              Đăng tin
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostScreen;
