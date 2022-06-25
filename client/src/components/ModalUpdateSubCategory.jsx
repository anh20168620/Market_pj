import React, { useEffect, useState } from "react";
import "../assets/css/modalUpdateSubCategory.css";

function ModalUpdateSubCategory({
  subCategoryName,
  subCategoryId,
  hiddenModal,
  reload,
}) {
  const [newNameSubCategory, setNewNameSubCategory] = useState("");
  useEffect(() => {
    setNewNameSubCategory(subCategoryName);
  }, [subCategoryName]);

  // update name sub category
  const handleUpdateNameSubCategory = async () => {
    await fetch(
      `http://localhost:3001/sub-category/update-name/${subCategoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: newNameSubCategory }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          hiddenModal();
          reload();
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateNameSubCategory();
    }
  };

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
            autoFocus
            onChange={(e) => setNewNameSubCategory(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <div
            className="btn-send-update btn"
            onClick={handleUpdateNameSubCategory}
          >
            Cập nhật
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateSubCategory;
