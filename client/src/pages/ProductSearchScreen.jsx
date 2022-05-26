import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./../components/Header";
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

function ProductSearchScreen() {
  const param = useParams();
  const [product, setProduct] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeFilterId, setActiveFilterId] = useState("");

  const [message, setMessage] = useState("");

  const fetchData = (pageNumber) => {
    fetch(
      `http://localhost:3001/product/search?wordSearch=${param.wordSearch}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product.length > 0) {
          setProduct(data.product);
          setTotal(data.total);
          setMessage("");
        } else if (data.success && data.product.length < 1) {
          setMessage("Không tìm thấy sản phẩm nào phù hợp");
        }
      });
  };

  useEffect(() => {
    const productCardWillMount = async () => {
      fetchData(pageNumber);
    };
    productCardWillMount(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.wordSearch]);

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

  // Filter
  const getProductByFilter = async (id) => {
    setActiveFilterId(id);
    await fetch(
      `http://localhost:3001/product/search?wordSearch=${param.wordSearch}&pageNumber=${pageNumber}&pageSize=${pageSize}&optionsFilter=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.product.length === 0);
        if (data.success && data.product.length !== 0) {
          setProduct(data.product);
          setTotal(data.total);
          setMessage("");
        } else if (data.product.length === 0) {
          setProduct([]);
          setTotal(0);
          setMessage("Không tìm thấy sản phẩm nào phù hợp");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <section className="ProductByCategory">
        <div className="container">
          <div className="container_border_noflex">
            <div className="category-name">
              Kết quả tìm kiếm cho : "{param.wordSearch}"
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
            {product.length > 0 ? (
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
            ) : (
              <div className="not_found_message">{message}</div>
            )}
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

export default ProductSearchScreen;
