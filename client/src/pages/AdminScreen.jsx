import React, { useEffect, useState } from "react";
import HeaderAdmin from "./../components/HeaderAdmin";
import ModalNotify from "./../components/ModalNotify";
import "../assets/css/adminScreen.css";

function AdminScreen({ socket }) {
  const admin = localStorage.getItem("admin");

  const [show, setShow] = useState(false);
  const [report, setReport] = useState([]);
  const [total, setTotal] = useState(null);
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalProductInWeek, setTotalProductInWeek] = useState(null);
  const [totalUser, setTotalUser] = useState(null);

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
    // socket.on("getUsers", (users) => {
    //   console.log(users);
    // });
  }, [socket, admin]);

  // get report socket
  useEffect(() => {
    socket.on("getReport", (data) => {
      console.log(data);
      setReport((prev) => [data, ...prev]);
      setTotal((prev) => prev + 1);
    });
  }, [socket]);

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

  // get total product
  useEffect(() => {
    const getTotalProduct = async () => {
      await fetch(`http://localhost:3001/product/get`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotalProduct(data.total);
          }
        });
    };
    getTotalProduct();
  }, []);

  // get total product in 7 day ago
  useEffect(() => {
    const getTotalProductInWeek = async () => {
      await fetch(`http://localhost:3001/product/get-product-week`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotalProductInWeek(data.total);
          }
        });
    };
    getTotalProductInWeek();
  }, []);

  // get total user
  useEffect(() => {
    const getTotalUser = async () => {
      await fetch(`http://localhost:3001/user/total`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotalUser(data.total);
          }
        });
    };
    getTotalUser();
  }, []);

  return (
    <>
      <HeaderAdmin
        callbackShow={showModal}
        callbackHidden={hideModal}
        total={total}
      />
      {show && <ModalNotify deleteReport={deleteReport} report={report} />}

      {/* body admin screen */}
      <div className="body_admin_screen" onClick={hideModal}>
        <div className="container">
          <div className="container_border_noflex">
            <div className="admin_screen_title">Thống kê trang web :</div>
            <div className="admin_screen_content">
              <div className="admin_screen_box">
                Tổng số sản phẩm đang rao bán :
                <div className="admin_screen_box_number">{totalProduct}</div>
              </div>
              <div className="admin_screen_box">
                Tổng số sản phẩm mới trong 7 ngày gần đây :
                <div className="admin_screen_box_number">
                  {totalProductInWeek}
                </div>
              </div>
              <div className="admin_screen_box">
                Tổng số người dùng trang web :
                <div className="admin_screen_box_number">{totalUser}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminScreen;
