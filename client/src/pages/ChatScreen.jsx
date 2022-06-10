import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Conversation from "./../components/Conversation";
import "../assets/css/chatScreen.css";

function ChatScreen({ socket }) {
  const auth = localStorage.getItem("user");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit("addUser", JSON.parse(auth)._id);
    socket.on("getUsers", (users) => {
      console.log(users);
      const onlineUsersId = users.map((item) => item.userId);
      setOnlineUsers(onlineUsersId);
    });
  }, [auth, socket]);

  useEffect(() => {
    const getAllChat = async () => {
      await fetch(`http://localhost:3001/chat/get-chat/${JSON.parse(auth)._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setChats(data.chat);
          }
        });
    };
    getAllChat();
  }, [auth]);

  return (
    <div>
      <Header />
      <section className="ChatScreen">
        <div className="container">
          <div className="container_border_flex">
            <div className="chat_menu">
              <div className="chat_menu_conversation">
                {chats.map((chat, index) => (
                  <Conversation
                    key={index}
                    conversation={chat}
                    currentUserId={JSON.parse(auth)._id}
                    productId={chat.productId._id}
                    onlineUsers={onlineUsers}
                  />
                ))}
              </div>
            </div>
            <div className="chat_box">
              <span className="chat_box_message">
                Chọn 1 cuộc trò chuyện để bắt đầu
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatScreen;
