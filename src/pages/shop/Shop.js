import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";

import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridStandard = ({ location, products }) => {
  const [layout, setLayout] = useState("grid three-column"); // chọn layout

  const [sortType, setSortType] = useState(""); // sort theo categories và color
  const [sortValue, setSortValue] = useState(""); // thành phần trong categories và color
  const [filterSortType, setFilterSortType] = useState(""); // sort theo giá
  const [filterSortValue, setFilterSortValue] = useState(""); // giá thấp tới cao và ngược lại

  const [offset, setOffset] = useState(0); //vị trí bắt đầu lấy sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // page hiện tại
  const [currentData, setCurrentData] = useState([]); // lấy 15 sản phẩm
  const [sortedProducts, setSortedProducts] = useState([]); // lấy tất cả sản phẩm đã được sort trong db

  const pageLimit = 12; // số sản phẩm mỗi page
  const { pathname } = location; // đường dẫn hiện tại của trang web

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue); // sort sp theo categories, color
    const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue); // sort theo giá
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts); //lấy hết sản phẩm đã được sort và filter trong db
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit)); // lấy 15 sản phẩm đã đầu tiên
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Shop Page</title>
        <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cửa hàng</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30" />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />
                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />
                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopGridStandard);
