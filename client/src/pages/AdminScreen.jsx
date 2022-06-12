import React, { useEffect, useState } from "react";
import HeaderAdmin from "./../components/HeaderAdmin";
import "../assets/css/adminScreen.css";
import Footer from "./../components/Footer";

function AdminScreen({ socket }) {
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalProductInWeek, setTotalProductInWeek] = useState(null);
  const [totalUser, setTotalUser] = useState(null);

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
    <div>
      <HeaderAdmin socket={socket} />

      {/* body admin screen */}
      <div className="body_admin_screen" /*onClick={hideModal}*/>
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
      <Footer />
    </div>
  );
}

export default AdminScreen;
