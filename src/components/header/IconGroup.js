import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteAllFromCart, deleteFromCart } from "../../redux/actions/cartActions";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import { deleteAllFromWishlist } from "../../redux/actions/wishlistActions";
import { deleteFromCompare } from "../../redux/actions/compareActions";

const IconGroup = ({ currency, cartData, wishlistData, compareData, deleteFromCart, iconWhiteClass }) => {
  const user = useContext(UserContext);
  const { addToast } = useToasts();

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };
  const history = useHistory(); // Initialize useHistory hook

  const handleLogout = async (e) => {
    e.preventDefault();
    await user.setUser();
    localStorage.removeItem("user");
    localStorage.removeItem("redux_localstorage_simple");
    addToast("Logout success", { appearance: "success", autoDismiss: true, PlacementType: "top-left" });
    window.location.reload();
    history.push(process.env.PUBLIC_URL + "/"); // Replace with your actual homepage path
  };

  return (
    <div className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button className="account-setting-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>{user.user ? "" : "Đăng nhập"}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>{user.user ? "" : "Đăng kí"}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>{user.user ? "Cài đặt" : ""}</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>{user.user ? "Đăng xuất" : ""}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">{compareData && compareData.length ? compareData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">{wishlistData && wishlistData.length ? wishlistData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </button>
        {/* menu cart */}
        <MenuCart cartData={cartData} currency={currency} deleteFromCart={deleteFromCart} />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
