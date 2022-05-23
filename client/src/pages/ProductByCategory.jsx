import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/productByCategory.css";
import ProductCard from "./../components/ProductCard";

const optionFilter = [
  {
    id: 2,
    name: "Cá nhân",
  },
  {
    id: 3,
    name: "Bán chuyên",
  },
  {
    id: 4,
    name: "Giá thấp nhất trước",
  },
  {
    id: 5,
    name: "Giá cao nhất trước",
  },
  {
    id: 6,
    name: "Tin cũ nhất",
  },
];

function ProductByCategory() {
  const param = useParams();

  const [subCategory, setSubCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);

  const [activeId, setActiveId] = useState("");
  const [activeFilterId, setActiveFilterId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/sub-category/get/${param.categoryId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubCategory(data.subCategory);
          // console.log(data.subCategory);
        }
      });
  }, [param.categoryId]);

  const getAllProductOfCategory = async () => {
    setSubCategoryId("");
    setActiveId("");
    setActiveFilterId("");
    fetchData(pageNumber);
  };

  const fetchData = (pageNumber) => {
    fetch(
      `http://localhost:3001/product/product-by-category?categoryId=${param.categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          setProduct(responseData.product);
          setTotal(responseData.total);
          // console.log(responseData);
        } else {
          console.log(responseData.message);
        }
      });
  };

  useEffect(() => {
    const productCardWillMount = async () => {
      fetchData(pageNumber);
    };
    productCardWillMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageSize = 10;
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

  // product by subCategory
  const getProductBySubCategory = async (id) => {
    setSubCategoryId(id);
    setActiveId(id);
    // console.log(id);
    await fetch(
      `http://localhost:3001/product/product-by-category?categoryId=${param.categoryId}&subCategoryId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { "Content-Type": "application" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setTotal(data.total);
        }
      });
  };

  // Filter
  const getProductByFilter = async (id) => {
    setActiveFilterId(id);
    await fetch(
      `http://localhost:3001/product/product-by-category?categoryId=${param.categoryId}&subCategoryId=${subCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&option=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setTotal(data.total);
        } else {
          console.log(data.message);
        }
      });
  };

  return (
    <div>
      <Header />
      <section className="ProductByCategory">
        <div className="container">
          <div className="container_border_noflex">
            <div className="subCategory">
              <div
                className="subCategory_btn active"
                onClick={getAllProductOfCategory}
              >
                Tất cả
              </div>
              {subCategory.map((item, index) => {
                let className = "subCategory_btn";
                if (item._id === activeId) {
                  className += " active";
                }
                return (
                  <div
                    key={index}
                    className={className}
                    onClick={() => getProductBySubCategory(item._id)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>

            <section className="SelecterFilter">
              <div className="subCategory">
                {optionFilter.map((item, index) => {
                  let className = "option_filter";
                  if (item.id === activeFilterId) {
                    className += " active";
                  }
                  return (
                    <div
                      key={index}
                      className={className}
                      onClick={() => getProductByFilter(item.id)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="product_list">
              {product.map((item, index) => (
                <ProductCard
                  key={index}
                  productId={item._id}
                  image={`http://localhost:3001/image_product/${item.image[0]}`}
                  title={item.title}
                  price={item.price}
                  time={item.createdAt}
                  address={item.address}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* panigation */}
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
    </div>
  );
}

export default ProductByCategory;
