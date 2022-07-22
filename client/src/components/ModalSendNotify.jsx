import React, { useState } from "react";
import "../assets/css/modalSendNotify.css";

function ModalSendNotify({ callbackHidden, reciverId, socket }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  // Send notify
  const handleSubmidNotify = async () => {
    await fetch(`http://localhost:3001/admin/send-notification/${reciverId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
          // socket send notify
          socket?.emit("sendNotify", data.notify);
          setTimeout(() => {
            setMsg("");
            callbackHidden();
          }, 2000);
        }
      });
  };
  // Send notify for all users
  const handleSubmidNotifys = async () => {
    await fetch(`http://localhost:3001/admin/send-notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // socket send notify
          socket?.emit("sendNotifies", {
            title,
            content,
            seen: false,
          });
          console.log(data.notify);
          setMsg(data.message);
          setTimeout(() => {
            setMsg("");
            callbackHidden();
          }, 2000);
        }
      });
  };

  return (
    <div>
      <section className="ModalReport" onClick={callbackHidden}>
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
          <div className="modal_header">Gửi thông báo đến người dùng</div>
          <div className="modal_close" onClick={callbackHidden}>
            {" "}
            &times;
          </div>
          <div className="modal_body">
            <label htmlFor="title" className="modal_label">
              <div className="modal_title">Tiêu đề (ít nhất 10 ký tự) :</div>
              <input
                className="modal_input"
                id="title"
                type="text"
                minLength={10}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="textarea_count">
                {title.length}/{500}
              </div>
            </label>

            <label className="modal_label" htmlFor="textarea">
              <div className="modal_title">
                Nội dung thông báo (từ 10 đến 500 ký tự) :
              </div>
              <textarea
                className="modal_textArea"
                name=""
                id="textarea"
                cols="60"
                rows="5"
                maxLength={500}
                minLength={10}
                placeholder="Vui lòng viết nội dung thông báo..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="textarea_count">
                {content.length}/{500}
              </div>
            </label>
            {msg && <div className="success_msg">{msg}</div>}
            {title.length >= 10 &&
              content.length < 500 &&
              content.length >= 10 && (
                <div
                  className="btn-send-notify btn"
                  onClick={reciverId ? handleSubmidNotify : handleSubmidNotifys}
                >
                  Gửi thông báo
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModalSendNotify;
