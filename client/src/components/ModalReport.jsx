import React, { useState } from "react";
import "../assets/css/ModalReport.css";

const options = [
  { id: 1, value: "Lừa đảo" },
  { id: 2, value: "Trùng lặp" },
  { id: 3, value: "Không liên lạc được" },
  { id: 4, value: "Thông tin không đúng thực tế" },
  { id: 5, value: "Hàng giả, kém chất lượng" },
  { id: 6, value: "Hàng hư hỏng sau khi mua" },
  { id: 7, value: "Lý do khác" },
];

function ModalReport(props) {
  const auth = localStorage.getItem("user");
  const [report, setReport] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setReport(e.target.value);
  };

  const handleChangeTextarea = (e) => {
    setDescription(e.target.value);
  };

  const submitReport = async () => {
    props.socket.emit("sendReport", {
      userId: JSON.parse(auth)._id,
      userName: JSON.parse(auth).fullName,
      userAvatar: JSON.parse(auth).avatar,
      productId: props.product._id,
      productName: props.product.title,
      title: report,
      content: description,
    });
    await fetch(`http://localhost:3001/report/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(auth)._id,
        productId: props.product._id,
        title: report,
        content: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
          setTimeout(() => {
            props?.callbackHidden();
          }, 2000);
        }
      });
  };

  return (
    <div>
      <section className="ModalReport" onClick={props?.callbackHidden}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
          <div className="modal_header">Báo cáo vi phạm</div>
          <div className="modal_close" onClick={props?.callbackHidden}>
            &times;
          </div>
          <div className="modal_body">
            <div className="modal_title">Bài đăng này có vấn đề gì </div>
            <div className="modal_checkbox">
              {options.map((option, index) => {
                return (
                  <label
                    className="modal_label"
                    htmlFor={option.id}
                    key={index}
                  >
                    {option.value}
                    <input
                      type="radio"
                      name="radio"
                      id={option.id}
                      value={option.value}
                      onChange={(e) => handleChange(e)}
                      hidden
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>

            {report && (
              <>
                <div className="modal_title">
                  Chi tiết vấn đề (từ 10-500 ký tự){" "}
                </div>
                <div className="report_detail">
                  <textarea
                    name=""
                    id=""
                    cols="64"
                    rows="5"
                    maxLength={500}
                    placeholder="Vui lòng chia sẻ thêm lý do về trường hợp này (bắt buộc))"
                    value={description}
                    onChange={(e) => handleChangeTextarea(e)}
                  ></textarea>
                  <div className="textarea_count">
                    {description.length}/{500}
                  </div>
                </div>
              </>
            )}

            {message && <div className="success_msg msg_report">{message}</div>}
            {report && description && description.length > 10 && (
              <div className="btn btn_report_submit" onClick={submitReport}>
                Gửi báo cáo
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModalReport;
