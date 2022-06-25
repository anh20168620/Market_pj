import React, { useState } from "react";

function ModalAddSubCategory({
  hiddenModalAddSubCategory,
  categoryId,
  reload,
}) {
  const [newSubCategory, setNewSubCategory] = useState("");

  const handleAddSubCategory = async () => {
    await fetch(`http://localhost:3001/sub-category/add-subCategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subCategoryName: newSubCategory,
        categoryId: categoryId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          reload();
          hiddenModalAddSubCategory();
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSubCategory();
    }
  };
  return (
    <div
      className="modal_update_subCategory"
      onClick={hiddenModalAddSubCategory}
    >
      <div className="modal_update_subCategory_container">
        <div
          className="modal_update_subCategory_content"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            className="input_update_subCategory"
            autoFocus
            onChange={(e) => setNewSubCategory(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <div className="btn-send-update btn" onClick={handleAddSubCategory}>
            Cập nhật
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddSubCategory;
