import React, { useEffect, useState } from "react";
import HeaderAdmin from "./../components/HeaderAdmin";
import ProductImage from "./../components/ProductImage";
import ProductInfo from "./../components/ProductInfo";
import { useParams } from "react-router-dom";
import Footer from "./../components/Footer";
import UserOfProduct from "./../components/UserOfProduct";
import "../assets/css/adminDetailReport.css";

function AdminDetailReport({ socket }) {
  const [product, setProduct] = useState({});
  const [report, setReport] = useState({});
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(null);
  const [msg, setMsg] = useState("");

  const param = useParams();

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
          setMsg("Đã xóa báo cáo");
          setTimeout(() => {
            window.location = "/admin";
          }, 2000);
        }
      });
  };

  // delete product

  const deleteProduct = async (productId, reportId) => {
    await fetch(`http://localhost:3001/product/delete/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
          setTimeout(() => {
            deleteReport(reportId);
          }, 2000);
        }
      });
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
              {msg && <div className="success_msg">{msg}</div>}
              <div className="admin_handle_report">
                <div
                  className="admin_handle_option btn"
                  onClick={() =>
                    deleteProduct(report.productId._id, report._id)
                  }
                >
                  Xóa bài đăng
                </div>
                <div
                  className="admin_handle_option btn"
                  onClick={() => deleteReport(report._id)}
                >
                  Bỏ qua báo cáo
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
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AdminDetailReport;
