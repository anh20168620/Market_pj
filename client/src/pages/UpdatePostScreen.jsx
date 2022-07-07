import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";

function UpdatePostScreen() {
  // bắt đầu
  const param = useParams();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [subCategorys, setSubCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState("");
  const [insurance, setInsurance] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfSell, setTypeOfSell] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:3001/product/product-get?productId=${param.productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setImages(data.product.image);
          setTitle(product.title);
          setPrice(product.price);
          setInsurance(product.insurance);
          setBrand(product.brand);
          setStatus(product.status);
          setDescription(product.description);
          setAddress(product.address);
          setTypeOfSell(product.typeOfSell);
          setCategoryId(data.product.categoryId._id);
          setSubCategoryId(data.product.subCategoryId._id);
        }
      });
  }, [
    param.productId,
    product.title,
    product.description,
    product.brand,
    product.price,
    product.status,
    product.typeOfSell,
    product.address,
    product.insurance,
  ]);
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
      if (images && images.length > 0) {
        const formData = new FormData();
        for (const image of images) {
          formData.append("imageProduct", image);
        }
        await fetch(
          `http://localhost:3001/product/image-product-update?productId=${param.productId}`,
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
              if (typeof data.image === "string") {
                const imageSrcs = [data.image];
                const images = data.files;
                images.map(async (image) => imageSrcs.push(image.filename));
                setMsg(data.message);
                setErr("");
                setLoading(false);
                // Create product
                fetch(
                  `http://localhost:3001/product/product-update?productId=${param.productId}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
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
                  }
                )
                  .then((response) => response.json())
                  .then((responseData) => {
                    if (!responseData.success) {
                      setImages([]);
                      setLoading(false);
                      setErr(responseData.message);
                    } else {
                      // console.log(responseData.product);
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
              } else if (typeof data.image === "object") {
                const imageSrcs = [...data.image];
                const images = data.files;
                images.map(async (image) => imageSrcs.push(image.filename));
                setMsg(data.message);
                setErr("");
                setLoading(false);

                // Create product
                fetch(
                  `http://localhost:3001/product/product-update?productId=${param.productId}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
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
                  }
                )
                  .then((response) => response.json())
                  .then((responseData) => {
                    if (!responseData.success) {
                      setImages([]);
                      setLoading(false);
                      setErr(responseData.message);
                    } else {
                      // console.log(responseData.product);
                      setLoading(false);
                      setErr("");
                      setMsg(responseData.message);
                      setTimeout(() => {
                        window.location = "/your-post";
                      }, 1500);
                    }
                  })
                  .catch((err) => {
                    setLoading(false);
                    setImages([]);
                    setErr(err.message);
                  });
              }
            }
          });
      } else {
        setErr("Vui lòng chọn ảnh");
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
                    src={
                      !image.preview
                        ? `http://localhost:3001/image_product/${image}`
                        : image.preview
                    }
                    alt="Preview"
                  />
                ))}
            </div>
          </div>
          <div className="postScreen_infor">
            <select className="select" onChange={handleCategorySelect}>
              <option hidden>
                {product && product.categoryId && product.categoryId.name}
              </option>
              {categorys.map((category) => (
                <option
                  className="option"
                  key={category._id}
                  value={category._id ? category._id : categoryId}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <select className="select" onChange={handleSubCategorySelect}>
              <option hidden>
                {product && product.categoryId && product.subCategoryId.name}
              </option>
              {subCategorys.map((subCategory) => (
                <option
                  className="option"
                  key={subCategory._id}
                  value={subCategory._id ? subCategory._id : subCategoryId}
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
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="" className="register_label">
              <span>Giá sản phẩm (VND) :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập giá sản phẩm"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="" className="register_label">
              <span>Hãng(thương hiệu, xuất xứ) :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Nhập thương hiệu"
              value={brand || ""}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label htmlFor="" className="register_label">
              <span>Bảo hành (không bắt buộc) :</span>
            </label>
            <select
              className="select_infor"
              onChange={(e) => setInsurance(e.target.value)}
            >
              <option hidden>{insurance}</option>
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
              <option hidden>{status}</option>
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
              <option hidden>{typeOfSell}</option>
              <option>Cá nhân</option>
              <option>Bán chuyên</option>
            </select>

            <label htmlFor="" className="register_label">
              <span>Nhập mô tả sản phẩm :</span>
            </label>
            <textarea
              className="textarea"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
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
              <span>Địa chỉ chi tiết :</span>
            </label>
            <input
              type="text"
              className="register_input"
              placeholder="Địa chỉ"
              value={address || ""}
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
                Lưu thay đổi
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdatePostScreen;
