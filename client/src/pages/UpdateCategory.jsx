import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "./../components/HeaderAdmin";
import "../assets/css/updateCategory.css";
import ModalUpdateSubCategory from "./../components/ModalUpdateSubCategory";

function UpdateCategory() {
  const [category, setCategory] = useState({});
  const [subCategorys, setSubCategorys] = useState([]);
  const [nameCategory, setNameCategory] = useState("");

  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const [imgPreview, setImgPreview] = useState();
  const [img, setImg] = useState({});

  const [show, setShow] = useState(false);

  const param = useParams();
  // get category
  useEffect(() => {
    const fetchCategory = async () => {
      await fetch(
        `http://localhost:3001/category/get-by-id/${param.categoryId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCategory(data.category);
            setNameCategory(data.category.name);
          }
        });
    };
    fetchCategory();
  }, [param]);

  // get subCategory
  useEffect(() => {
    const fetchSubCategory = async () => {
      await fetch(`http://localhost:3001/sub-category/get/${param.categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSubCategorys(data.subCategory);
          }
        });
    };
    fetchSubCategory();
  }, [param]);

  // update subCategory
  const updateSubcategory = async (subCategoryId) => {
    console.log(subCategoryId);
    await fetch(`http://localhost:3001/sub-category/get/${subCategoryId}`);
  };

  const hiddenModal = () => {
    setShow(false);
  };

  useEffect(() => {
    // Cleanup
    return () => {
      URL.revokeObjectURL(imgPreview?.preview);
    };
  }, [imgPreview]);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
    file.preview = URL.createObjectURL(file);
    setImgPreview(file);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="body_admin_screen">
        <div className="container">
          <div className="container_border_noflex">
            <div className="admin_category_title">{nameCategory}</div>
            {category.image && (
              <img
                src={`http://localhost:3001/image_category/${category.image}`}
                alt=""
                className="category_item_img"
              />
            )}
            <div className="update_category">
              <div className="update_category_title">Cập nhật danh mục: </div>
              <label className="update_category_lable">
                Đổi tên danh mục:{" "}
              </label>
              <input
                type="text"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
                className="input_update_subCategory"
              />

              <br></br>
              {imgPreview && (
                <img
                  src={imgPreview.preview}
                  alt=""
                  className="preview_img_item"
                />
              )}
              <div className="update_category_img">
                <label className="update_category_lable">
                  Đổi ảnh danh mục:
                </label>
                <input type="file" onChange={handlePreviewImage} />
              </div>
            </div>
            <div className="btn-send-update btn">Cập nhật</div>
            <div className="update_subcategory">
              <div className="update_category_title">
                Cập nhật các loại sản phẩm trong danh mục:
              </div>
              <div className="update_subcategory_list">
                {subCategorys &&
                  subCategorys.map((subCategory) => (
                    <div key={subCategory._id}>
                      <div className="update_subcategory_item">
                        {subCategory.name}
                        <div
                          onClick={() =>
                            setSubCategoryName(subCategory.name) &
                            setSubCategoryId(subCategory._id) &
                            setShow(true)
                          }
                          className="subCategory_update_btn"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <ModalUpdateSubCategory
          hiddenModal={hiddenModal}
          subCategoryId={subCategoryId}
          subCategoryName={subCategoryName}
        />
      )}
    </div>
  );
}

export default UpdateCategory;
