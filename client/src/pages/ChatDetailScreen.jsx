import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/chatScreen.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";

function ChatDetailScreen() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const param = useParams();

  useEffect(() => {
    const createChat = async () => {
      await fetch("http://localhost:3001/chat/new-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: param.ownId,
          receiverId: param.userId,
          productId: param.productId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCurrentChat(data.Chatt);
            getConversation();
          } else {
            setCurrentChat(...data.chat);
            getConversation();
          }
        });
    };
    createChat(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConversation = async () => {
    await fetch(`http://localhost:3001/chat/get-chat/${param.ownId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setConversation(data.chat);
        }
      });
  };
  // getConversation();

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
          })
          .catch((err) => {
            console.log(err.message);
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

  const deleteHandler = async () => {
    await fetch(`http://localhost:3001/chat/delete-chat/${currentChat._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setConversation(
            conversation.filter((item) => item._id !== data.chatDelete._id)
          );
          setCurrentChat(null);

          fetch(
            `http://localhost:3001/message/delete-message/${currentChat._id}`,
            { method: "DELETE" }
          )
            .then((response) => response.json())
            .then((dataResponse) => {
              if (dataResponse.success) {
                console.log(dataResponse.message);
              }
            });
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
                {conversation.map((item, index) => (
                  <div key={index} onClick={() => setCurrentChat(item)}>
                    <Conversation
                      currentChat={currentChat}
                      conversation={item}
                      currentUserId={param.ownId}
                      productId={item.productId._id}
                    />
                  </div>
                ))}
              </div>

              {currentChat ? (
                <div className="chat_delete" onClick={deleteHandler}>
                  <i className="fa-regular fa-trash-can"></i>Xóa cuộc trò chuyện
                </div>
              ) : null}
            </div>

            {currentChat ? (
              <div className="chat_box">
                <div className="chat_box_product">
                  <div className="chat_box_product_img">
                    <img
                      src={`http://localhost:3001/image_product/${currentChat.productId.image[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="chat_box_product_info">
                    <div className="chat_box_product_title">
                      {currentChat.productId.title}
                    </div>
                    <div className="chat_box_product_price">
                      {currentChat.productId.price}
                    </div>
                  </div>
                </div>

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
              <span className="chat_box_message">
                Chọn 1 cuộc trò chuyện để bắt đầu
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatDetailScreen;