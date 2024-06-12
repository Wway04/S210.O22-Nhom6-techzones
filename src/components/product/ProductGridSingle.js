import PropTypes from "prop-types";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../App";

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const user = useContext(UserContext);
  const history = useHistory(); // Initialize useHistory hook

  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = (product.price * currency.currencyRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const finalDiscountedPrice = (discountedPrice * currency.currencyRate)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img className="default-img" src={process.env.PUBLIC_URL + product.image[0]} alt="" />
              {product.image.length > 1 ? (
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1]} alt="" />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span className="pink">-{product.discount}%</span> : ""}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
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
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
                    Buy now
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>Select Option</Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => {
                      if (user?.user?.id) {
                        addToCart(product, addToast);
                      } else {
                        history.push(process.env.PUBLIC_URL + "/login-register"); // Replace with your actual homepage path
                      }
                    }}
                    className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
                  >
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0 ? "Added" : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>{product.name}</Link>
            </h3>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price">
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
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingle;
