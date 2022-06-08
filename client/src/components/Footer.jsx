import React from "react";
import "../assets/css/footer.css";

function Footer() {
  return (
    <div>
      <section className="Footer">
        <div className="container">
          <div className="footer_container">
            <div className="footer_about">
              <div className="footer_title">Về chợ việt</div>
              <div className="footer_link">
                <div className="footer_item">Giới thiệu</div>
                <div className="footer_item">Tuyển dụng</div>
                <div className="footer_item">Tuyền thông</div>
                <div className="footer_item">Blog</div>
              </div>
            </div>
            <div className="footer_support">
              <div className="footer_title">Hỗ trợ khách hàng</div>
              <div className="footer_link">
                <div className="footer_item">Trung tâm trợ giúp</div>
                <div className="footer_item">Quy định chợ Việt</div>
                <div className="footer_item">An toàn mua bán</div>
                <div className="footer_item">Liên hệ hỗ trợ</div>
              </div>
            </div>
            <div className="footer_social">
              <div className="footer_title">Liên kết</div>
              <div className="footer_link_icon">
                <a href="/" className="footer_icon">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="/" className="footer_icon">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="/" className="footer_icon">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
              <div className="footer_contact">
                Email: trogiup@choViet.vn - Tổng đài CSKH: 19001000(1.000đ/phút)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
