import React from "react";
import moment from "moment";

function ModalNotifyUser({ notify, seenNotify, handleDelete }) {
  const auth = localStorage.getItem("user");

  !auth && (window.location = "/login");

  return (
    <div>
      <div className="modal_notify_container">
        {notify.length > 0 &&
          auth &&
          notify.map((item, index) => (
            <div key={index}>
              <div
                className="modal_notify_content"
                onClick={() => seenNotify(item._id)}
              >
                <div className="modal_notify_avatar">
                  <img
                    src={`http://localhost:3001/avatar/avatarAdmin.png`}
                    alt=""
                  />
                  {!item.seen && <i className="fa-solid fa-circle red"></i>}
                </div>
                <div className="modal_notify_body">
                  <div className="modal_notify_text">
                    <span className="text_bold">{item.title} :</span>{" "}
                    {item.content}
                  </div>
                  <div className="modal_notify_sub">
                    <div className="modal_notify_time">
                      {moment(item?.createdAt).fromNow()}
                    </div>
                    <div
                      className="modal_notify_btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xóa thông báo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {notify.length === 0 && auth && (
          <div className="modal_notify_content">
            Bạn không có thông báo nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalNotifyUser;
