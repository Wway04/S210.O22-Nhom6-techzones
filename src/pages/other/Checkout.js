import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect, useDispatch } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { UserContext } from "../../App";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useHistory } from "react-router-dom";

const URL = "http://localhost:3001/api/v1";

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  const {
    vouchers,
    voucherName,
    price,
    voucherValue,
    user,
    totalPrice,
    voucherId,
    setPrice,
    setTotalPrice,
    setVoucherValue,
  } = useContext(UserContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    let totalPrice = 0;
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
  }, [cartItems, currency]);

  const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function createOrder(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const result = await response.json();
      return result; // parses JSON response into native JavaScript objects
    }
    async function createOrderDetail(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const result = await response.json();
      return result; // parses JSON response into native JavaScript objects
    }

    const { insertId } = await createOrder(`${URL}/orders`, {
      customer_id: user?.id,
      name,
      email,
      address,
      phone,
      message,
      price: parseInt(totalPrice),
      voucher_id: voucherId,
    });
    history.push("/check-out-complete");

    await createOrderDetail(`${URL}/order-details`, { order_id: insertId, cartItems });
    await dispatch(deleteAllFromCart());
  };

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Checkout</title>
        <meta name="description" content="Checkout page of techzones react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Thanh toán</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Thông tin đơn hàng</h3>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="billing-info mb-20">
                          <label>Tên</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Địa chỉ</label>
                          <input
                            className="billing-address"
                            placeholder=""
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Số điện thoại</label>
                          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="additional-info-wrap">
                      <h4>Thông tin thêm</h4>
                      <div className="additional-info">
                        <label>Ghi chú đơn hàng</label>
                        <textarea
                          placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng."
                          name="message"
                          defaultValue={""}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Đơn hàng của bạn</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Sản phẩm</li>
                            <li>Tổng</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem) => {
                              const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
                              const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
                              const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                              return (
                                <li key={cartItem.id}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencyName === "VND"
                                        ? (finalDiscountedPrice * cartItem.quantity)
                                            .toFixed(0)
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                                        : currency.currencySymbol +
                                          (finalDiscountedPrice * cartItem.quantity)
                                            .toFixed(2)
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      : currency.currencyName === "VND"
                                      ? (finalProductPrice * cartItem.quantity)
                                          .toFixed(0)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                                      : currency.currencySymbol +
                                        (finalProductPrice * cartItem.quantity)
                                          .toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Giá vận chuyển</li>
                            <li>Miễn phí vận chuyển</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          {voucherName && (
                            <div className="your-order-bottom mb-4">
                              <ul>
                                <li className="your-order-shipping">{voucherName}</li>
                                <span>
                                  -{" "}
                                  {currency?.currencyName === "VND"
                                    ? ((price * voucherValue) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                      currency.currencySymbol
                                    : currency.currencySymbol +
                                      ((price * voucherValue) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                              </ul>
                            </div>
                          )}
                          <ul>
                            <li className="order-total">Tổng</li>
                            <li>
                              {currency.currencyName === "VND"
                                ? totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                                : currency.currencySymbol + totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={handleSubmit}>
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tìm thấy sản phẩm nào trong giỏ hàng để thanh toán <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>Mua sắm ngay</Link>
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
