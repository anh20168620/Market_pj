import React, { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";

function AddNewCategory() {
  const [imgPreview, setImgPreview] = useState();
  const [img, setImg] = useState();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [nameCategory, setNameCategory] = useState();

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    file.preview = URL.createObjectURL(file);
    setImgPreview(file);
  };

  // add new category

  const handleAddCategory = async () => {
    // add image category+check
    const formData = new FormData();
    formData.append("imgCategory", img);
    await fetch(`http://localhost:3001/category/add-new-image-category`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.success) {
          await fetch(`http://localhost:3001/category/add-category`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nameCategory,
              image: data.imageUrl,
            }),
          })
            .then((response) => response.json())
            .then((dataResponse) => {
              if (dataResponse.success) {
                setErr("");
                setMsg(dataResponse.message);
                setTimeout(() => {
                  setMsg("");
                }, 1500);
              } else {
                setErr(dataResponse.message);
              }
            });
        } else {
          setErr(data.message);
        }
      });
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="body_admin_screen">
        <div className="container">
          <div className="container_border_noflex">
            <div className="admin_category_title">
              Thêm một danh mục sản phẩm mới :
            </div>
            <label className="update_category_lable">Tên danh mục :</label>
            <input
              type="text"
              name=""
              id=""
              className="input_update_subCategory"
              onChange={(e) => setNameCategory(e.target.value)}
            />

            {imgPreview && (
              <img
                src={imgPreview.preview}
                alt=""
                className="preview_img_category"
              />
            )}
            <div className="update_category_img">
              <label className="update_category_lable">
                Ảnh danh mục: {""}
              </label>
              <input type="file" name="" id="" onChange={handlePreviewImage} />
            </div>

            {msg && <div className="success_msg">{msg}</div>}
            {err && <div className="err_msg">{err}</div>}

            {nameCategory?.length > 0 && img && (
              <div className="btn" onClick={handleAddCategory}>
                Thêm danh mục
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewCategory;
