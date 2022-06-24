import React, { useEffect, useState } from "react";
import "../assets/css/modalUpdateSubCategory.css";

function ModalUpdateSubCategory({
  subCategoryName,
  subCategoryId,
  hiddenModal,
}) {
  const [newNameSubCategory, setNewNameSubCategory] = useState("");
  useEffect(() => {
    setNewNameSubCategory(subCategoryName);
  }, [subCategoryName]);

  return (
    <div className="modal_update_subCategory" onClick={hiddenModal}>
      <div className="modal_update_subCategory_container">
        <div
          className="modal_update_subCategory_content"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            className="input_update_subCategory"
            value={newNameSubCategory}
            onChange={(e) => setNewNameSubCategory(e.target.value)}
          />
          <div className="btn-send-update btn">Cập nhật</div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateSubCategory;
