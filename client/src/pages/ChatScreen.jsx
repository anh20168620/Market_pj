import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/chatScreen.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";

function ChatScreen() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const param = useParams();

  useEffect(() => {
    const getConversation = async () => {
      await fetch(`http://localhost:3001/chat/get-chat/${param.ownId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setConversation(data.chat);
          }
        });
    };
    getConversation();
  }, [param.ownId]);

  useEffect(() => {
    const getMessage = async () => {
      currentChat &&
        (await fetch(
          `http://localhost:3001/message/get-message/${currentChat._id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setMessages(data.message);
            }
          }));
    };
    getMessage();
  }, [currentChat]);

  const handleSubmid = async (e) => {
    e.preventDefault();
    const message = {
      sender: param.ownId,
      content: newMessage,
      chatId: currentChat._id,
    };
    await fetch(`http://localhost:3001/message/add-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages([...messages, data.saveMessage]);
          setNewMessage("");
        }
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Header />
      <section className="ChatScreen">
        <div className="container">
          <div className="container_border_flex">
            <div className="chat_menu">
              {conversation.map((item, index) => (
                <div key={index} onClick={() => setCurrentChat(item)}>
                  <Conversation
                    conversation={item}
                    currentUserId={param.ownId}
                  />
                </div>
              ))}
            </div>

            {currentChat ? (
              <div className="chat_box">
                <div className="chat_box_top">
                  {messages.map((item, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={item}
                        own={item.sender === param.ownId}
                      />
                    </div>
                  ))}
                </div>
                <div className="chat_box_bottom">
                  <input
                    className="chat_input"
                    placeholder="Viết tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className="chat_submit btn" onClick={handleSubmid}>
                    <i className="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            ) : (
              <span className="not_found_message">
                Chọn 1 cuộc trò chuyện để bắt đầu
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatScreen;
