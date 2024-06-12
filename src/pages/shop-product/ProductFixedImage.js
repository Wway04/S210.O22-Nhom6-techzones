import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const ProductFixedImage = ({ location, product }) => {
  console.log("🚀 ~ ProductFixedImage ~ product:", product);
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Product Page</title>
        <meta name="description" content="Product page of flone react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Sản phẩm</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="fixedImage"
        />

        {/* product description tab */}
        <ProductDescriptionTab spaceBottomClass="pb-90" product={product} productFullDesc={product?.fullDescription} />

        {/* related product slider */}
        <RelatedProductSlider spaceBottomClass="pb-95" category={product?.category} />
      </LayoutOne>
    </Fragment>
  );
};

ProductFixedImage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.find((single) => single.id === parseInt(itemId)),
  };
};

export default connect(mapStateToProps)(ProductFixedImage);
