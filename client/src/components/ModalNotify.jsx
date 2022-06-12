import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/modalNotify.css";

function ModalNotify({ report, deleteReport }) {
  const [showDelete, setShowDelete] = useState(false);
  const [reportId, setReportId] = useState(null);

  const handleDelete = (reportId) => {
    setShowDelete(!showDelete);
    setReportId(reportId);
  };
  return (
    <div>
      <div className="modal_notify_container">
        {!showDelete && report ? (
          report.map((item, index) => (
            <div key={index} className="modal_notify_content">
              <div className="modal_notify_avatar">
                <img
                  src={`http://localhost:3001/avatar/${
                    item.userId?.avatar || item.userAvatar
                  }`}
                  alt=""
                />
              </div>
              <div className="modal_notify_body">
                <div className="modal_notify_text">
                  <span className="text_bold">
                    {item.userId?.fullName || item.userName}
                  </span>{" "}
                  báo cáo về bài đăng về{" "}
                  <span className="text_bold">
                    {item.productId?.title || item.productName}
                  </span>{" "}
                  về vấn đề <span className="text_bold">{item.title}</span>.
                </div>
                <div className="modal_notify_sub">
                  <div className="modal_notify_time">
                    {moment(item.createdAt).fromNow()}
                  </div>
                  <Link
                    to={`/admin/detail-report/${
                      item.productId?._id || item.productId
                    }/${item._id}/${item.userAvatar}/${item.userName}/${
                      item.userId
                    }
                    /${item.userNumberPhone}`}
                    className="modal_notify_btn"
                  >
                    Xem chi tiết
                  </Link>
                  <div
                    className="modal_notify_btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xóa báo cáo
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {report?.map((item, index) => (
              <div key={index} className="modal_notify_content">
                <div className="modal_notify_avatar">
                  <img
                    src={`http://localhost:3001/avatar/${
                      item.userId.avatar || item.userAvatar
                    }`}
                    alt=""
                  />
                </div>
                <div className="modal_notify_body">
                  <div className="modal_notify_text">
                    <span className="text_bold">
                      {item.userId.fullName || item.userName}
                    </span>{" "}
                    báo cáo về bài đăng về{" "}
                    <span className="text_bold">
                      {item.productId?.title || item.productName}
                    </span>{" "}
                    về vấn đề <span className="text_bold">{item.title}</span>.
                  </div>
                  <div className="modal_notify_sub">
                    <div className="modal_notify_time">
                      {moment(item.createdAt).fromNow()}
                    </div>
                    <Link
                      to={`/admin/detail-report/${
                        item.productId?._id || item.productId
                      }/${item._id}`}
                      className="modal_notify_btn"
                    >
                      Xem chi tiết
                    </Link>
                    <div
                      className="modal_notify_btn"
                      onClick={() => setShowDelete(!showDelete)}
                    >
                      Xóa báo cáo
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <div className="modal_delete">
                <div className="modal_delete_container">
                  <div className="modal_delete_header">
                    Bạn muốn xóa báo cáo này ?
                  </div>
                  <div className="modal_delete_button">
                    <div
                      className="modal_delete_butt"
                      onClick={() => {
                        deleteReport(reportId) && setShowDelete(false);
                      }}
                    >
                      Xóa
                    </div>
                    <div
                      className="modal_delete_butt"
                      onClick={() => setShowDelete(false)}
                    >
                      Hủy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalNotify;
