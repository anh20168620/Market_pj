import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Conversation from "./../components/Conversation";
import "../assets/css/chatScreen.css";

function ChatScreen({ socket }) {
  const auth = localStorage.getItem("user");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversationSocket, setConversationSocket] = useState([]);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit("addUser", JSON.parse(auth)._id);
    socket.on("getUsers", (users) => {
      const onlineUsersId = users.map((item) => item.userId);
      setOnlineUsers(onlineUsersId);
    });
  }, [auth, socket]);

  useEffect(() => {
    socket?.on("notification", (data) => {
      setConversationSocket((prev) => [
        {
          lastMessageId: data.data.message._id,
          productId: data.data.message.productId,
          seen: false,
          users: data.data.message.chatId.users,
          _id: data.data.message.chatId._id,
          senderId: data.data.message.sender._id,
        },
        ...prev,
      ]);
    });
  }, [socket]);

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

  // setSeenChat
  const callbackSeen = async (conversationId) => {
    await fetch(
      `http://localhost:3001/chat/seen/${conversationId}/${
        JSON.parse(auth)._id
      }`,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChats(data.chat);
        }
      });
  };

  return (
    <div>
      <Header />
      <section className="ChatScreen">
        <div className="container">
          <div className="container_border_flex">
            <div className="chat_menu">
              <div className="chat_menu_conversation">
                {chats.map((chat, index) => {
                  return (
                    <Conversation
                      key={index}
                      conversation={chat}
                      currentUserId={JSON.parse(auth)._id}
                      productId={chat.productId._id}
                      onlineUsers={onlineUsers}
                      callbackSeen={callbackSeen}
                      seen={chat.seen}
                      conversationSocket={conversationSocket}
                    />
                  );
                })}
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
