import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "./../components/HeaderAdmin";
import "../assets/css/updateCategory.css";
import ModalUpdateSubCategory from "./../components/ModalUpdateSubCategory";
import ModalAddSubCategory from "./../components/ModalAddSubCategory";
import ModalConfirmDelete from "./../components/ModalConfirmDelete";

function UpdateCategory() {
  const [category, setCategory] = useState({});
  const [subCategorys, setSubCategorys] = useState([]);
  const [nameCategory, setNameCategory] = useState("");

  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const [imgPreview, setImgPreview] = useState();
  const [img, setImg] = useState();

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [showModalAddSubCategory, setShowModalAddSubCategory] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const param = useParams();

  // reload

  const reload = () => {
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
  };

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

  const hiddenModal = () => {
    setShow(false);
  };

  const hiddenModalAddSubCategory = () => {
    setShowModalAddSubCategory(false);
  };

  const hiddenModalConfirmDelete = () => {
    setShowModalConfirmDelete(false);
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

  // update name category
  const handleUpdateNameCategory = async () => {
    await fetch(
      `http://localhost:3001/category/updateName/${param.categoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameCategory: nameCategory }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
          setTimeout(() => {
            setMsg("");
          }, 1500);
        }
      });
  };

  // cancel update name category
  const handleCancelUpdateName = () => {
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
  };

  // update image category

  const handleUpdateImageCategory = async () => {
    const formData = new FormData();
    formData.append("imgCategory", img);

    await fetch(
      `http://localhost:3001/category/update-image/${param.categoryId}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
          setImgPreview(null);
          setImg(null);
          setErr("");
        } else if (!data.success) {
          setErr(data.message);
        }
      });
  };

  // cancel update image category

  const handleCancelUpdateImageCategory = () => {
    setImgPreview(null);
    setImg(null);
  };

  // delete subCategory
  const handleDeleteSubCategory = async () => {
    await fetch(`http://localhost:3001/sub-category/delete/${subCategoryId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          reload();
          hiddenModalConfirmDelete();
        }
      });
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
              {
                <div
                  className="btn-send-update btn"
                  onClick={handleUpdateNameCategory}
                >
                  Thay đổi
                </div>
              }
              {
                <div
                  className="btn-send-update btn"
                  onClick={handleCancelUpdateName}
                >
                  Hủy
                </div>
              }
              {msg && <div className="success_msg">{msg}</div>}

              <br></br>
              {imgPreview && (
                <img
                  src={imgPreview.preview}
                  alt=""
                  className="preview_img_category"
                />
              )}
              <div className="update_category_img">
                <label className="update_category_lable">
                  Đổi ảnh danh mục:
                </label>
                <input type="file" onChange={handlePreviewImage} />
                {img && (
                  <div
                    className="btn-send-update btn"
                    onClick={handleUpdateImageCategory}
                  >
                    Thay đổi
                  </div>
                )}
                {img && (
                  <div
                    className="btn-send-update btn"
                    onClick={handleCancelUpdateImageCategory}
                  >
                    Hủy
                  </div>
                )}
                {err && <div className="err_msg">{err}</div>}
              </div>
            </div>

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
                        <div
                          className="subCategory_update_btn"
                          onClick={() => {
                            setSubCategoryId(subCategory._id);
                            setShowModalConfirmDelete(true);
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="update_subcategory_item">
                  *** Thêm loại sản phẩm
                  <div
                    className="subCategory_update_btn"
                    onClick={() => setShowModalAddSubCategory(true)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </div>
                </div>
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
          reload={reload}
        />
      )}

      {showModalAddSubCategory && (
        <ModalAddSubCategory
          hiddenModalAddSubCategory={hiddenModalAddSubCategory}
          categoryId={param.categoryId}
          reload={reload}
        />
      )}

      {showModalConfirmDelete && (
        <ModalConfirmDelete
          callBackDelete={handleDeleteSubCategory}
          hiddenModalConfirmDelete={hiddenModalConfirmDelete}
        />
      )}
    </div>
  );
}

export default UpdateCategory;
