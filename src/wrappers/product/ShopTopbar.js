import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = ({ getLayout, getFilterSortParams, productCount, sortedProductCount }) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getLayout={getLayout} // hàm setlayout
        getFilterSortParams={getFilterSortParams} // hàm sort sản phẩm theo giá
        productCount={productCount} // tổng số sản phẩm hiện có
        sortedProductCount={sortedProductCount} // số lượng sản phẩm hiện tại và được sort
      />
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopbar;
