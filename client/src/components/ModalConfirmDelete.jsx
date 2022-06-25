import React from "react";
import "../assets/css/modalConfirmDelete.css";

function ModalConfirmDelete({
  subCategoryId,
  reload,
  hiddenModalConfirmDelete,
}) {
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
      <div className="modal_confirm_delete" onClick={hiddenModalConfirmDelete}>
        <div
          className="modal_confirm_delete_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal_confirm_delete_body">
            <div className="modal_confirm_delete_title">
              Bạn muốn xóa loại sản phẩm này ?
            </div>
            <div className="modal_confirm_delete_btn">
              <div className="btn" onClick={handleDeleteSubCategory}>
                Xóa
              </div>
              <div className="btn" onClick={hiddenModalConfirmDelete}>
                Hủy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmDelete;
