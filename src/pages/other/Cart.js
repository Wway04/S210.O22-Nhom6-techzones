import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { UserContext } from "../../App";

const Cart = ({ location, cartItems, currency, decreaseQuantity, addToCart, deleteFromCart, deleteAllFromCart }) => {
  const {
    vouchers,
    totalPrice,
    voucherValue,
    voucherName,
    price,
    setVoucherId,
    setPrice,
    setVoucherName,
    setVoucherValue,
    setTotalPrice,
  } = useContext(UserContext);
  console.log(voucherValue);
  const [voucher, setVoucher] = useState("");
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;

  useEffect(() => {
    if (!voucher) {
      setVoucherValue(0);
      setVoucherName("");
      setVoucherId();
    }
    let totalPrice = 0;
    let price = 0;
    cartItems.forEach((cartItem) => {
      const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
      const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
      const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
      discountedPrice != null
        ? (totalPrice += finalDiscountedPrice * cartItem.quantity)
        : (totalPrice += finalProductPrice * cartItem.quantity);
    });
    setTotalPrice(totalPrice - (totalPrice * voucherValue) / 100);
    setPrice(totalPrice);
  }, [cartItems, currency, voucherValue, voucher]);

  const checkVoucher = (voucher) => {
    let result = false;
    let value;
    vouchers.findIndex((v) => {
      console.log(v.code);
      if (v.code === voucher) {
        result = true;
        value = parseInt(v?.value);
        setVoucherName(v?.name);
        setVoucherId(v?.id);
        return;
      }
    });
    if (result) {
      return { isVoucher: true, value };
    } else {
      return { isVoucher: false, value };
    }
  };

  const handleVoucher = (e) => {
    e.preventDefault();
    const result = checkVoucher(voucher);
    if (result.isVoucher) {
      addToast("Mã giảm giá hợp lệ", { appearance: "success", autoDismiss: true });
      setVoucherValue(result.value);
    } else {
      addToast("Mã giảm giá không hợp lệ", { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Cart</title>
        <meta name="description" content="Cart page of techzones react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cart</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Các sản phẩm trong giỏ hàng</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
                            const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + cartItem.id}>
                                    <img
                                      className="img-fluid"
                                      src={process.env.PUBLIC_URL + cartItem.image[0]}
                                      alt=""
                                    />
                                  </Link>
                                </td>
                                <td className="product-name">
                                  <Link to={process.env.PUBLIC_URL + "/product/" + cartItem.id}>{cartItem.name}</Link>
                                </td>
                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      {currency.currencyName === "VND" ? (
                                        <>
                                          <span className="amount old">
                                            {finalProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                              currency.currencySymbol}
                                          </span>
                                          <span className="amount">
                                            {finalDiscountedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                              currency.currencySymbol}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="amount old">
                                            {currency.currencySymbol +
                                              finalProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                          </span>
                                          <span className="amount">
                                            {currency.currencySymbol +
                                              finalDiscountedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                          </span>
                                        </>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencyName === "VND"
                                        ? finalProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                          currency.currencySymbol
                                        : currency.currencySymbol +
                                          finalProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() => decreaseQuantity(cartItem, addToast)}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => addToCart(cartItem, addToast, quantityCount)}
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencyName === "VND"
                                      ? (finalDiscountedPrice * cartItem.quantity)
                                          .toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                                      : currency.currencySymbol +
                                        (finalDiscountedPrice * cartItem.quantity)
                                          .toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : currency.currencyName === "VND"
                                    ? (finalProductPrice * cartItem.quantity)
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                                    : currency.currencySymbol +
                                      (finalProductPrice * cartItem.quantity)
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => deleteFromCart(cartItem, addToast)}>
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
                        <button onClick={() => deleteAllFromCart(addToast)}>Xóa tất cả sản phẩm</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Estimate Shipping And Tax</h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>Enter your destination to get a shipping estimate.</p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-6 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Sử dụng mã giảm giá</h4>
                      </div>
                      <div className="discount-code">
                        <p>Nhập mã giảm giá nếu bạn có.</p>
                        <form>
                          <input
                            type="text"
                            required
                            name="voucher"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                          />
                          <button className="cart-btn-2" type="submit" onClick={handleVoucher}>
                            Áp dụng mã giảm giá
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">Tổng sản phẩm trong giỏ hàng</h4>
                      </div>
                      <h5>
                        Tổng sản phẩm
                        <span>
                          {currency?.currencyName === "VND"
                            ? price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                            : currency.currencySymbol + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </h5>
                      {voucherName && (
                        <h5>
                          {voucherName}
                          <span>
                            -{" "}
                            {currency?.currencyName === "VND"
                              ? ((price * voucherValue) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                currency.currencySymbol
                              : currency.currencySymbol +
                                ((price * voucherValue) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </h5>
                      )}

                      <h4 className="grand-totall-title">
                        Tổng tiền
                        <span>
                          {currency?.currencyName === "VND"
                            ? totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                            : currency.currencySymbol + totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>Thanh toán</Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br /> <Link to={process.env.PUBLIC_URL + "/shop"}>Shop Now</Link>
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

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
