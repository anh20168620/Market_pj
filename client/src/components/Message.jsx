import React from "react";
import moment from "moment";
import "moment/locale/vi";
import "../assets/css/message.css";

function Message({ message, own }) {
  return (
    <div className={own ? "message_chat own" : "message_chat"}>
      <div className="message_top">
        <img
          className="message_img"
          src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
          alt=""
        />
        <p className="message_text">{message.content}</p>
      </div>
      <div className="message_bottom">
        {moment(message.createdAt).fromNow()}
      </div>
    </div>
  );
}

export default Message;
