import PropTypes from "prop-types";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
}) => {
  const user = useContext(UserContext);
  const history = useHistory(); // Initialize useHistory hook

  const [productStock, setProductStock] = useState(product.stock ? product.stock : 0);
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(cartItems, product);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            {currency.currencyName === "VND" ? (
              <>
                <span>{finalDiscountedPrice + " " + currency.currencySymbol}</span>
                <span className="old">{finalProductPrice + " " + currency.currencySymbol}</span>
              </>
            ) : (
              <>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>
                <span className="old">{currency.currencySymbol + finalProductPrice}</span>
              </>
            )}
          </Fragment>
        ) : (
          <span>
            {currency.currencyName === "VND"
              ? finalProductPrice + " " + currency.currencySymbol
              : currency.currencySymbol + finalProductPrice}
          </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
              className="dec qtybutton"
            >
              -
            </button>
            <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
            <button
              onClick={() =>
                setQuantityCount(quantityCount < productStock - productCartQty ? quantityCount + 1 : quantityCount)
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() => {
                  if (user?.user?.id) {
                    addToCart(product, addToast, quantityCount);
                  } else {
                    history.push(process.env.PUBLIC_URL + "/login-register"); // Replace with your actual homepage path
                  }
                }}
                disabled={productCartQty >= productStock}
              >
                Thêm vào giỏ hàng
              </button>
            ) : (
              <button disabled>Hết hàng</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
              onClick={() => {
                if (user?.user?.id) {
                  addToWishlist(product, addToast);
                } else {
                  history.push(process.env.PUBLIC_URL + "/login-register"); // Replace with your actual homepage path
                }
              }}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={compareItem !== undefined ? "Added to compare" : "Add to compare"}
              onClick={() => {
                if (user?.user?.id) {
                  addToCompare(product, addToast);
                } else {
                  history.push(process.env.PUBLIC_URL + "/login-register"); // Replace with your actual homepage path
                }
              }}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Danh mục :</span>
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>{product.category}</Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
