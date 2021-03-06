import React, { useEffect, useState } from "react";
import HeaderAdmin from "./../components/HeaderAdmin";
import ProductImage from "./../components/ProductImage";
import ProductInfo from "./../components/ProductInfo";
import { useParams } from "react-router-dom";
import Footer from "./../components/Footer";
import UserOfProduct from "./../components/UserOfProduct";
import "../assets/css/adminDetailReport.css";
import ModalSendNotify from "./../components/ModalSendNotify";
import ModalConfirmDelete from "../components/ModalConfirmDelete";

function AdminDetailReport({ socket }) {
  const [product, setProduct] = useState({});
  const [report, setReport] = useState({});
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(null);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [reciverId, setReciverId] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const param = useParams();

  const hiddenModalConfirmDelete = () => {
    setShowModalConfirmDelete(false);
  };

  // get reports
  useEffect(() => {
    const fetchGetReport = async () => {
      await fetch("http://localhost:3001/report/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotal(data.total);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchGetReport();
  }, []);

  // get product by id
  useEffect(() => {
    fetch(
      `http://localhost:3001/product/get-detail?productId=${param.productId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          console.log(data.message);
        }
      });
  }, [param]);

  //   get report by id
  useEffect(() => {
    const fetchReportById = async () => {
      fetch(`http://localhost:3001/report/getReport?reportId=${param.reportId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setReport(data.report);
          }
        });
    };

    param.reportId !== "undefined" && fetchReportById();
  }, [param]);

  // delete report
  const deleteReport = async (reportId) => {
    await fetch(`http://localhost:3001/report/delete/${reportId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReports(data.newReports);
          setTotal(data.total);
          setMsg("???? x??a b??o c??o");
          setTimeout(() => {
            window.location = "/admin";
          }, 1500);
        }
      });
  };

  // delete product

  const deleteProduct = async (productId, reportId) => {
    setLoading(true);
    hiddenModalConfirmDelete();
    await fetch(`http://localhost:3001/product/delete/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: report.title,
        content: report.content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setMsg(data.message);
          setTimeout(() => {
            deleteReport(reportId);
          }, 1500);
        }
      });
  };

  const showModalSendNotify = (userId) => {
    setReciverId(userId);
    setShow(true);
  };

  const hiddenModalSendNotify = () => {
    setShow(false);
  };

  return (
    <div>
      {reports.length !== 0 ? (
        <HeaderAdmin
          socket={socket}
          totalInAdminDetailReport={total}
          reportInAdminDetailReport={reports}
        />
      ) : (
        <HeaderAdmin socket={socket} />
      )}
      <section className="Product_detail">
        <div className="container">
          <div className="container_border">
            <div className="product_section">
              <ProductImage detail={product} />
              <ProductInfo detail={product} />

              <div className="product_report_detail">
                <div className="product_info_title">Chi ti???t b??o c??o</div>
                <br />
                <label className="product_info_label">L?? do b??o c??o :</label>
                <span className="product_info_brand">{report.title}</span>
                <br />
                <label className="product_info_label">Chi ti???t b??o c??o :</label>
                <span className="product_info_brand">{report.content}</span>
                <br />
              </div>
              {msg && <div className="success_msg">{msg}</div>}
              {loading && <div className="loading"></div>}
              <div className="admin_handle_report">
                <div
                  className="admin_handle_option btn"
                  onClick={() => {
                    setShowModalConfirmDelete(true);
                  }}
                >
                  X??a b??i ????ng
                </div>
                <div
                  className="admin_handle_option btn"
                  onClick={() => deleteReport(report._id)}
                >
                  B??? qua b??o c??o
                </div>
              </div>
            </div>
            <div className="product_user">
              <UserOfProduct
                report={report}
                userName={param.userName}
                userAvatar={param.userAvatar}
                userId={param.userId}
                userNumberPhone={param.userNumberPhone}
                detail={product}
                callbackShow={showModalSendNotify}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {show && (
        <ModalSendNotify
          reciverId={reciverId}
          callbackHidden={hiddenModalSendNotify}
          socket={socket}
        />
      )}
      {showModalConfirmDelete && (
        <ModalConfirmDelete
          callBackDelete={() => deleteProduct(report.productId._id, report._id)}
          hiddenModalConfirmDelete={hiddenModalConfirmDelete}
        />
      )}
    </div>
  );
}

export default AdminDetailReport;
