import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { io } from "socket.io-client";

import UserMenu from "../components/UserMenu";
import Logo from "../assets/images/logo.png";
import ModalNotifyUser from "../components/ModalNotifyUser";
import "../assets/css/header.css";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

function Header() {
  const auth = localStorage.getItem("user");
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showModalNotiFy, setShowModalNotiFy] = useState(false);
  const [total, setTotal] = useState(null);
  const [totalMessage, setTotalMessage] = useState(null);
  const [notify, setNotify] = useState([]);

  // add user from socket
  useEffect(() => {
    socket?.emit("addUser", JSON.parse(auth)?._id);
    socket?.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [auth]);

  // socket notify from admin
  useEffect(() => {
    socket?.on("getNotify", (data) => {
      setTotal((prev) => prev + 1);
      setNotify((prev) => [data, ...prev]);
    });
  }, []);

  // socket notify from admin
  useEffect(() => {
    socket?.on("getNotifies", (data) => {
      setTotal((prev) => prev + 1);
      setNotify((prev) => [data, ...prev]);
    });
  }, []);

  const showModal = (e) => {
    e.stopPropagation();
    setShowModalNotiFy(!showModalNotiFy);
  };

  // get notify
  useEffect(() => {
    const getNotify = async () => {
      await fetch(`http://localhost:3001/user/notify/${JSON.parse(auth)?._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setNotify(data.notify);
            setTotal(data.total);
          }
        });
    };
    auth && getNotify();
  }, [auth]);

  // set status seen notify
  const seenNotify = async (notifyId) => {
    await fetch(
      `http://localhost:3001/user/notify-seen/${notifyId}/${
        JSON.parse(auth)._id
      }`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotify(data.notifyUpdate);
          setTotal(data.total);
        }
      });
  };

  const hideModal = () => {
    setShowModalNotiFy(false);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/product-search/${searchInput}`;
    }
  };

  // delete notify
  const handleDelete = async (notifyId) => {
    await fetch(
      `http://localhost:3001/user/delete-notify/${notifyId}/${
        JSON.parse(auth)._id
      }`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotify(data.notify);
          setTotal(data.total);
        }
      });
  };

  // get notifications message socket
  useEffect(() => {
    socket.on("notification", (data) => {
      if (data.data.message.sender._id !== JSON.parse(auth)?._id) {
        data.data.message.chatId._id && setTotalMessage((prev) => prev + 1);
      }
    });
  }, [auth]);

  // get total chat unseen
  useEffect(() => {
    const getTotalMessageUnseen = async () => {
      auth &&
        (await fetch(
          `http://localhost:3001/chat/get-chat/${JSON.parse(auth)?._id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              const chatUnseen = data.chat.filter(
                (item) =>
                  item.seen === false &&
                  item.lastMessageId.sender !== JSON.parse(auth)._id
              );
              setTotalMessage(chatUnseen.length);
            }
          }));
    };
    getTotalMessageUnseen();
  }, [auth]);

  return (
    <>
      <section className="Header" onClick={hideModal}>
        <div className="container">
          <div className="header_up">
            <div className="header_logo">
              <Link to="/" onClick={goToTop}>
                <img src={Logo} alt="header_logo" />
              </Link>
            </div>
            <div className="header_list">
              <Link to="/" className="header_item">
                <div className="header_home">
                  <div className="header_item_icon">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <span className="header_link" onClick={goToTop}>
                    Trang chủ
                  </span>
                </div>
              </Link>
              <Link to="/your-post" className="header_item">
                <div className="header_post">
                  <div className="header_item_icon">
                    <i className="fa-regular fa-file-lines"></i>
                  </div>
                  <span className="header_link">Tin của bạn</span>
                </div>
              </Link>
              <Link to="/chat" className="header_item">
                <div className="header_chat">
                  <div className="header_item_icon">
                    <div className="NotificationBadge">
                      <NotificationBadge
                        count={totalMessage}
                        effect={Effect.SCALE}
                      />
                    </div>
                    <i className="fa-regular fa-comment"></i>
                  </div>
                  <span className="header_link">Chat</span>
                </div>
              </Link>
              <div className="header_item" onClick={showModal}>
                <div className="header_notice">
                  <div className="header_item_icon">
                    <div className="NotificationBadge">
                      <NotificationBadge count={total} effect={Effect.SCALE} />
                    </div>
                    <i className="fa-regular fa-bell"></i>
                  </div>
                  <span to="/" className="header_link">
                    Thông báo
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-under">
            <div className="header_search">
              <input
                type="search"
                id="query"
                name="q"
                placeholder="Tìm kiếm trên Chợ Việt"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              {searchInput && (
                <Link
                  to={`/product-search/${searchInput}`}
                  className="btn btn-search"
                >
                  Tìm kiếm
                </Link>
              )}
            </div>
            <div className="header_user">
              {auth ? (
                <>
                  <img
                    src={`http://localhost:3001/avatar/${
                      JSON.parse(auth).avatar
                    }`}
                    alt=""
                    className="img_avatar"
                  />
                  <div className=" header_user_login">
                    <button
                      onClick={() => setShow(!show)}
                      className="user_name"
                    >
                      <div>{JSON.parse(auth).fullName}</div>
                    </button>
                    {show && <UserMenu />}
                  </div>
                </>
              ) : (
                <div className="btn header_user_login">
                  <Link to="/login" className="header_link">
                    Đăng nhập
                  </Link>
                </div>
              )}
              <div className="btn header_user_post">
                <Link to="/post" className="header_link">
                  Đăng tin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModalNotiFy && (
        <ModalNotifyUser
          seenNotify={seenNotify}
          notify={notify}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Header;
