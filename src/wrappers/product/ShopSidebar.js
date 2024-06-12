import PropTypes from "prop-types";
import React from "react";
import ShopCategories from "../../components/product/ShopCategories";
import ShopSearch from "../../components/product/ShopSearch";
import { getIndividualCategories } from "../../helpers/product";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getIndividualCategories(products); // lấy ra các categories của sản phẩm và không trùng nhau

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search -- ???? */}
      <ShopSearch />
      {/* filter by categories */}
      <ShopCategories categories={uniqueCategories} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
