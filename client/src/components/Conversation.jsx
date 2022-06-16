import React, { useState, useEffect } from "react";
import "../assets/css/conversation.css";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

function Conversation({
  conversation,
  currentUserId,
  productId,
  currentChat,
  onlineUsers,
  seen,
  callbackSeen,
  conversationSocket,
}) {
  const [user, setUser] = useState([]);
  const [online, setOnline] = useState(false);
  const [chatId, setChatId] = useState("");
  const [show, setShow] = useState(true);

  // set chatId
  useEffect(() => {
    currentChat && setChatId(currentChat._id);
  }, [currentChat]);

  // socket join room
  useEffect(() => {
    if (chatId !== "") {
      socket.emit("join_room", chatId);
    }
  }, [chatId]);

  useEffect(() => {
    const friend = conversation.users?.find(
      (item) => item._id !== currentUserId
    );
    setUser(friend);
  }, [currentUserId, conversation]);

  useEffect(() => {
    if (onlineUsers && onlineUsers?.includes(user?._id)) {
      setOnline(true);
    }
  }, [user?._id, onlineUsers]);

  useEffect(() => {
    setShow(true);
  }, [conversationSocket]);

  return (
    <Link
      to={`/chat/${currentUserId}/${user?._id}/${productId}`}
      onClick={() =>
        (conversationSocket?.senderId !== currentUserId && setShow(false)) ||
        (conversation.lastMessageId?.sender !== currentUserId &&
          callbackSeen(conversation._id)) ||
        (conversation.lastMessageId?.sender !== currentUserId &&
          currentChat._id === conversation._id &&
          callbackSeen(conversation._id))
      }
    >
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
              {/* {!seen &&
                (conversation.lastMessageId?.sender !== currentUserId ||
                  conversation.senderId !== currentUserId) && (
                  <div className="notify_message">có tin nhắn mới</div>
                )} */}
            </span>
          </div>
        </div>
      ) : (
        <div className="conversation">
          <img
            src={user?.avatar && `http://localhost:3001/avatar/${user?.avatar}`}
            alt=""
            className="conversation_img"
          />
          <div className="conversation_name">
            <div className="conversation_name_detail">
              {user?.fullName}
              {online ? (
                <i className="fa-solid fa-circle online"></i>
              ) : (
                <i className="fa-solid fa-circle"></i>
              )}
            </div>
            <span className="conversation_product_title">
              {conversation.productId.title}
              {(!seen &&
                conversation.lastMessageId?.sender !== currentUserId && (
                  <div className="notify_message">có tin nhắn mới</div>
                )) ||
                (show &&
                  conversationSocket.length > 0 &&
                  conversationSocket.find(
                    (item) =>
                      !item?.seen &&
                      item?.senderId !== undefined &&
                      item?.senderId !== currentUserId &&
                      conversation._id === item?._id
                  ) && <div className="notify_message">có tin nhắn mới</div>)}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default Conversation;
