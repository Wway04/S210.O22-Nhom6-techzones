import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  deleteFromWishlist,
  deleteAllFromWishlist,
}) => {
  const { addToast } = useToasts();
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Wishlist</title>
        <meta name="description" content="Wishlist page of techzones react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Bộ sưu tập</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Danh sách sản phẩm yêu thích</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Thêm vào giỏ hàng</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            const discountedPrice = getDiscountPrice(wishlistItem.price, wishlistItem.discount);
                            const finalProductPrice = (wishlistItem.price * currency.currencyRate)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            const cartItem = cartItems.filter((item) => item.id === wishlistItem.id)[0];
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.id}>
                                    <img
                                      className="img-fluid"
                                      src={process.env.PUBLIC_URL + wishlistItem.image[0]}
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + wishlistItem.id}>
                                    {wishlistItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      {currency.currencyName === "VND" ? (
                                        <>
                                          <span className="amount old">
                                            {finalProductPrice.toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "VND",
                                            }) +
                                              " " +
                                              currency.currencySymbol}
                                          </span>
                                          <span className="amount">
                                            {finalDiscountedPrice + " " + currency.currencySymbol}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="amount old">
                                            {currency.currencySymbol + finalProductPrice}
                                          </span>
                                          <span className="amount">
                                            {currency.currencySymbol + finalDiscountedPrice}
                                          </span>
                                        </>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencyName === "VND"
                                        ? finalProductPrice + " " + currency.currencySymbol
                                        : currency.currencySymbol + finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishlistItem.affiliateLink ? (
                                    <a href={wishlistItem.affiliateLink} rel="noopener noreferrer" target="_blank">
                                      Mua ngay
                                    </a>
                                  ) : wishlistItem.variation && wishlistItem.variation.length >= 1 ? (
                                    <Link to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}>
                                      Select option
                                    </Link>
                                  ) : wishlistItem.stock && wishlistItem.stock > 0 ? (
                                    <button
                                      onClick={() => addToCart(wishlistItem, addToast)}
                                      className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                                      disabled={cartItem !== undefined && cartItem.quantity > 0}
                                      title={wishlistItem !== undefined ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
                                    >
                                      {cartItem !== undefined && cartItem.quantity > 0
                                        ? "Đã thêm"
                                        : "Thêm vào giỏ hàng"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Hết hàng
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => deleteFromWishlist(wishlistItem, addToast)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop"}>Tiếp tục mua sắm</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromWishlist(addToast)}>Xóa tất cả sản phẩm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không có sản phẩm nào trong danh sách yêu thích <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>Thêm sản phẩm</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount));
    },
    deleteFromWishlist: (item, addToast, quantityCount) => {
      dispatch(deleteFromWishlist(item, addToast, quantityCount));
    },
    deleteAllFromWishlist: (addToast) => {
      dispatch(deleteAllFromWishlist(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
