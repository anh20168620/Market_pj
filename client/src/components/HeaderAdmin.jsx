import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { io } from "socket.io-client";

import Logo from "../assets/images/logo.png";
import "../assets/css/headerAdmin.css";
import ModalNotifyAdmin from "./ModalNotifyAdmin";
import ModalSendNotify from "./ModalSendNotify";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

function HeaderAdmin({ totalInAdminDetailReport, reportInAdminDetailReport }) {
  const admin = localStorage.getItem("admin");

  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(null);
  const [report, setReport] = useState([]);
  const [showSendNotify, setShowModalNotiFy] = useState(false);

  //set again after delete in AdminDetailReport
  useEffect(() => {
    setTotal(totalInAdminDetailReport);
    setReport(reportInAdminDetailReport);
  }, [totalInAdminDetailReport, reportInAdminDetailReport]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const showModal = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const hideModal = () => {
    setShow(false);
  };

  // add admin from socket
  useEffect(() => {
    socket.emit("addUser", JSON.parse(admin)._id);
    socket.on("getUsers", (users) => {
      console.log(users);
    });
  }, [admin]);

  // get report socket
  useEffect(() => {
    socket.on("getReport", (data) => {
      console.log(data);
      setReport((prev) => [data, ...prev]);
      setTotal((prev) => prev + 1);
    });
  }, []);

  // get report
  useEffect(() => {
    const fetchGetReport = async () => {
      await fetch("http://localhost:3001/report/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setReport(data.report);
            setTotal(data.total);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchGetReport();
  }, []);
  // delete report
  const deleteReport = async (reportId) => {
    await fetch(`http://localhost:3001/report/delete/${reportId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReport(data.newReports);
          setTotal(data.total);
          setShow(true);
        }
      });
  };

  const hiddenModalSendNotify = () => {
    setShowModalNotiFy(false);
  };

  return (
    <>
      <section className="Header" onClick={hideModal}>
        <div className="container">
          <div className="header_up">
            <div className="header_logo">
              <Link to="/admin" onClick={goToTop}>
                <img src={Logo} alt="header_logo" />
              </Link>
            </div>
            <div className="header_list">
              <div className="header_item">
                <div className="header_home">
                  <div className="header_item_icon">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <Link to="/admin" className="header_link" onClick={goToTop}>
                    Trang chủ
                  </Link>
                </div>
              </div>
              <div
                className="header_item"
                onClick={() => setShowModalNotiFy(!showSendNotify)}
              >
                <div className="header_post">
                  <div className="header_item_icon">
                    <i className="fa-solid fa-arrows-down-to-people"></i>
                  </div>
                  <span className="header_link">Gửi thông báo tới tất cả</span>
                </div>
              </div>

              <div className="header_item" onClick={showModal}>
                <div className="header_notice">
                  <div className="header_item_icon">
                    <div className="NotificationBadge">
                      <NotificationBadge count={total} effect={Effect.SCALE} />
                    </div>
                    <i className="fa-regular fa-bell"></i>
                  </div>
                  <span className="header_link">Thông báo</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-under">
            <div className="header_admin_title">Quản lý</div>
            <div className="header_admin">
              <div className="header_admin_email">
                {JSON.parse(admin).email}
              </div>
              <button className="btn btn-logout" onClick={logOut}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </section>
      {show && <ModalNotifyAdmin deleteReport={deleteReport} report={report} />}
      {showSendNotify && (
        <ModalSendNotify
          callbackHidden={hiddenModalSendNotify}
          socket={socket}
        />
      )}
    </>
  );
}

export default HeaderAdmin;
