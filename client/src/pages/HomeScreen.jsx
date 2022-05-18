import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Banner from "../assets/images/banner.png";
import "../assets/css/homeScreen.css";
import { Link } from "react-router-dom";
import ProductCard from "./../components/ProductCard";

function HomeScreen() {
  const [categorys, setCategorys] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [responseData, setResponseData] = useState([]);

  const fetchData = (pageNumber) => {
    fetch(
      `http://localhost:3001/product/get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setResponseData(responseData.data);
        setTotal(responseData.total);
      });
  };
  useEffect(() => {
    const productCardWillMount = async () => {
      fetchData(pageNumber);
    };
    productCardWillMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      await fetch("http://localhost:3001/category/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCategorys(data.categorys);
          } else {
            console.log("Lỗi");
          }
        });
    };
    getCategory();
  }, []);

  const numberOfPages = Math.ceil(total / pageSize);
  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i + 1);
  }

  const handlePageChange = (pageNumber) => {
    // fetch new data
    fetchData(pageNumber);
    // set lại state pageNumber
    setPageNumber(pageNumber);
  };

  const loadPreviousPage = () => {
    if (pageNumber > 1) {
      fetchData(pageNumber - 1);
      setPageNumber(pageNumber - 1);
    }
  };

  const loadNextPage = () => {
    if (pageNumber < numberOfPages) {
      fetchData(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      <Header />
      <section className="Banner">
        <div className="container">
          <img src={Banner} alt="" className="banner_img" />
        </div>
      </section>
      <section className="Category">
        <div className="container container_category">
          <p className="category_title">Các danh mục hàng hóa</p>
          <ul className="category_list">
            {categorys.map((category) => (
              <Link key={category._id} to="/">
                <li className="category_item">
                  <img
                    src={`http://localhost:3001/image_category/${category.image}`}
                    alt=""
                    className="category_item_img"
                  />
                  <div className="category_item_name">{category.name}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      <section className="DisplayProduct">
        <div className="container container_display">
          <p className="category_title">Các sản phẩm mới nhất</p>
          <div className="product_list">
            {responseData.map((item) => {
              return (
                <ProductCard
                  key={item._id}
                  productId={item._id}
                  image={`http://localhost:3001/image_product/${item.image[0]}`}
                  title={item.title}
                  price={item.price}
                  time={item.createdAt}
                  address={item.address}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="pagination">
          <ul className="border_pagination">
            <li className="pagiantion_item" onClick={loadPreviousPage}>
              <div className="pagination_link">«</div>
            </li>
            {pages.map((page) => {
              let className = "pagiantion_item";
              if (page === pageNumber) {
                className += " active";
              }
              return (
                <li
                  className={className}
                  key={page}
                  onClick={() => {
                    handlePageChange(page);
                  }}
                >
                  <div className="pagination_link">{page}</div>
                </li>
              );
            })}

            <li className="pagiantion_item" onClick={loadNextPage}>
              <div className="pagination_link">»</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
