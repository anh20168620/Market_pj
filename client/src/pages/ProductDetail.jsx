import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./../components/Header";
import "../assets/css/productDetail.css";
import ProductImage from "./../components/ProductImage";
import ProductInfo from "./../components/ProductInfo";
import UserOfProduct from "./../components/UserOfProduct";
import Footer from "./../components/Footer";
import ModalReport from "./../components/ModalReport";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const param = useParams();
  const [show, setShow] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      <Header />
      <section className="Product_detail">
        <div className="container">
          <div className="container_border">
            <div className="product_section">
              <ProductImage detail={product} />
              <ProductInfo detail={product} callbackShow={showModal} />
            </div>
            <div className="product_user">
              <UserOfProduct detail={product} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {show && (
        <ModalReport callbackHidden={hideModal} productId={product._id} />
      )}
    </>
  );
}

export default ProductDetail;
