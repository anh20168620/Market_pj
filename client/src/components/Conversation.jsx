import React, { useState, useEffect } from "react";
import "../assets/css/conversation.css";

function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const friend = conversation.users.find(
      (item) => item._id !== currentUserId
    );
    setUser(friend);
  }, [currentUserId, conversation]);

  return (
    <div className="conversation">
      <img
        src={user.avatar && `http://localhost:3001/avatar/${user.avatar}`}
        alt=""
        className="conversation_img"
      />
      <span className="conversation_name">{user.fullName}</span>
    </div>
  );
}

export default Conversation;
