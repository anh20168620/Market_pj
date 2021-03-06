import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../assets/css/postScreen.css";

function PostScreen() {
  const auth = localStorage.getItem("user");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategorys, setSubCategorys] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [insurance, setInsurance] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfSell, setTypeOfSell] = useState("");

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleUploadImageProduct = async (e) => {
    const files = e.target.files[0];
    if (files) {
      setImages([...images, files]);
      files.preview = URL.createObjectURL(files);
    }
  };
  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);
    const newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };

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
    setCategoryId(e.target.value);
    // console.log(e.target.value);
    await fetch(`http://localhost:3001/sub-category/get/${e.target.value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data);
          setSubCategorys(data.subCategory);
        } else {
          console.log("Lỗi");
        }
      });
  };
  const handleSubCategorySelect = async (e) => {
    setSubCategoryId(e.target.value);
  };

  // Submit Post
  const handleSubmid = async () => {
    setLoading(true);
    //Upload image
    try {
      if (images.length > 0) {
        const formData = new FormData();
        for (const image of images) {
          formData.append("imageProduct", image);
        }
        await fetch(
          `http://localhost:3001/product/image-product/${JSON.parse(auth)._id}`,
          {
            method: "POST",
            credentials: "include",

            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              setErr(data.message);
              setLoading(false);
            } else {
              const imageSrcs = [];
              const images = data.files;
              images.map(async (image) => imageSrcs.push(image.filename));
              setMsg(data.message);
              setErr("");
              setLoading(false);
              // Create product
              fetch(`http://localhost:3001/product/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  userId: JSON.parse(auth)._id,
                  title,
                  price,
                  insurance,
                  brand,
                  description,
                  address,
                  status,
                  typeOfSell,
                  image: imageSrcs,
                  categoryId,
                  subCategoryId,
                }),
              })
                .then((response) => response.json())
                .then((responseData) => {
                  if (!responseData.success) {
                    setImages([]);
                    setLoading(false);
                    setErr(responseData.message);
                  } else {
                    setLoading(false);
                    setErr("");
                    setMsg(responseData.message);
                    setTimeout(() => {
                      window.location = "/";
                    }, 2000);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  setImages([]);
                  setErr(err.message);
                });
            }
          });
      } else {
        setErr("Vui lòng chọn ảnh!");
        setLoading(false);
      }
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <section className="PostScreen">
        <div className="container container_postScreen">
          <div className="postScreen_img">
            <label htmlFor="choose_img" className="choose_img_label">
              <div> Chọn từ 1 đến 3 ảnh</div>
              <small>Nhấn lại ảnh để xóa ảnh</small>
            </label>
            <input
              type="file"
              className="input_file"
              multiple
              accept=".png, .jpg, .jpeg"
              id="choose_img"
              name="choose_img"
              onChange={handleUploadImageProduct}
            />
            <div className="preview_img">
              {images &&
                images.map((image, index) => (
                  <img
                    onClick={() => onDelete(image)}
                    key={index}
                    className="preview_img_item"
                    src={image.preview}
                    alt="Preview"
                  />
                ))}
            </div>
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
            <select className="select" onChange={handleSubCategorySelect}>
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
              <span>Tiêu đề :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="" className="register_label">
              <span>Giá sản phẩm (VND) :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập giá sản phẩm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="" className="register_label">
              <span>Hãng(thương hiệu, xuất xứ) :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập thương hiệu"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label htmlFor="" className="register_label">
              <span>Bảo hành (không bắt buộc) :</span>
            </label>
            <select
              className="select_infor"
              onChange={(e) => setInsurance(e.target.value)}
            >
              <option hidden></option>
              <option>Còn bảo hành</option>
              <option>Hết bảo hành</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Tình trạng (không bắt buộc) :</span>
            </label>
            <select
              className="select_infor"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option hidden></option>
              <option>Mới</option>
              <option>Đã sử dụng(chưa sửa chữa)</option>
              <option>Đã sử dụng(qua sửa chữa)</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Dạng bán :</span>
            </label>
            <select
              onChange={(e) => setTypeOfSell(e.target.value)}
              className="select_infor"
            >
              <option hidden></option>
              <option>Cá nhân</option>
              <option>Bán chuyên</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Nhập mô tả sản phẩm :</span>
            </label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="91"
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
            <div className="textarea_count">
              {description.length}/{1500}
            </div>

            <label htmlFor="" className="register_label">
              <span>Địa chỉ chi tiết :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {msg && <div className="success_msg">{msg}</div>}
            {err && <div className="err_msg">{err}</div>}
            {loading ? (
              <button className="loadding btn">
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button className="btn" type="button" onClick={handleSubmid}>
                Đăng tin
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostScreen;
