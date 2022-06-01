import React, { useState, useEffect } from "react";
import "../assets/css/conversation.css";
import { Link } from "react-router-dom";

function Conversation({ conversation, currentUserId, productId, currentChat }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const friend = conversation.users.find(
      (item) => item._id !== currentUserId
    );
    setUser(friend);
  }, [currentUserId, conversation]);

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
            {user.fullName}
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
            {user.fullName}
            <span className="conversation_product_title">
              {conversation.productId.title}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default Conversation;
