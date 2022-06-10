import React, { useEffect, useState } from "react";
import HeaderAdmin from "./../components/HeaderAdmin";
import ModalNotify from "./../components/ModalNotify";

function AdminScreen({ socket }) {
  const admin = localStorage.getItem("admin");

  const [show, setShow] = useState(false);
  const [report, setReport] = useState([]);
  const [total, setTotal] = useState(null);
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

  return (
    <>
      <HeaderAdmin
        callbackShow={showModal}
        callbackHidden={hideModal}
        total={total}
      />
      {show && <ModalNotify deleteReport={deleteReport} report={report} />}
    </>
  );
}

export default AdminScreen;
