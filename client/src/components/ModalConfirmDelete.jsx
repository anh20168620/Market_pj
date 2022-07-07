import React from "react";
import "../assets/css/modalConfirmDelete.css";

function ModalConfirmDelete({ callBackDelete, hiddenModalConfirmDelete }) {
  return (
    <div>
      <div className="modal_confirm_delete" onClick={hiddenModalConfirmDelete}>
        <div
          className="modal_confirm_delete_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal_confirm_delete_body">
            <div className="modal_confirm_delete_title">
              Bạn chắc chắn muốn xóa ?
            </div>
            <div className="modal_confirm_delete_btn">
              <div className="btn" onClick={callBackDelete}>
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
