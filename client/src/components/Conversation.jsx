import React, { useState, useEffect } from "react";
import "../assets/css/conversation.css";
import { Link } from "react-router-dom";

function Conversation({
  conversation,
  currentUserId,
  productId,
  currentChat,
  onlineUsers,
  notifications,
}) {
  const [user, setUser] = useState([]);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const friend = conversation.users.find(
      (item) => item._id !== currentUserId
    );
    setUser(friend);
  }, [currentUserId, conversation]);

  useEffect(() => {
    if (onlineUsers && onlineUsers.includes(user._id)) {
      setOnline(true);
    }
  }, [user._id, onlineUsers]);

  return (
    <Link to={`/chat/${currentUserId}/${user._id}/${productId}`}>
      {conversation && currentChat && currentChat._id === conversation._id ? (
        <div className="conversation activee">
          <img
            src={user.avatar && `http://localhost:3001/avatar/${user.avatar}`}
            alt=""
            className="conversation_img"
          />
          <div className="conversation_name">
            <div className="conversation_name_detail">
              {user.fullName}
              {online ? (
                <i className="fa-solid fa-circle online"></i>
              ) : (
                <i className="fa-solid fa-circle"></i>
              )}
            </div>

            <span className="conversation_product_title">
              {conversation.productId.title}
            </span>
          </div>
        </div>
      ) : (
        <div className="conversation">
          <img
            src={user.avatar && `http://localhost:3001/avatar/${user.avatar}`}
            alt=""
            className="conversation_img"
          />
          <div className="conversation_name">
            <div className="conversation_name_detail">
              {user.fullName}
              {online ? (
                <i className="fa-solid fa-circle online"></i>
              ) : (
                <i className="fa-solid fa-circle"></i>
              )}
            </div>
            <span className="conversation_product_title">
              {conversation.productId.title}
              {notifications ? (
                <div className="notify_message">có tin nhắn mới</div>
              ) : null}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default Conversation;
