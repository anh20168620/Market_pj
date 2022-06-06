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
          src={
            message.sender &&
            message.sender.avatar &&
            `http://localhost:3001/avatar/${message.sender.avatar}`
          }
          alt=""
        />
        <p className="message_text">{message.content}</p>
      </div>
      <div className="message_bottom">
        {message.sender.fullName}
        <br />
        {moment(message.createdAt).fromNow()}
      </div>
    </div>
  );
}

export default Message;
