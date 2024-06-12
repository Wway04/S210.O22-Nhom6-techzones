import PropTypes from "prop-types";
import React, { Suspense, createContext, lazy, useEffect, useState } from "react";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { loadLanguages, multilanguage } from "redux-multilanguage";
import { store } from ".";
import ScrollToTop from "./helpers/scroll-top";
import { fetchProducts } from "./redux/actions/productActions";

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// shop pages
const Shop = lazy(() => import("./pages/shop/Shop"));

// product pages
const ProductFixedImage = lazy(() => import("./pages/shop-product/ProductFixedImage"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));
const CheckOutComplete = lazy(() => import("./pages/other/CheckOutComplete"));

export const UserContext = createContext();

const App = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [vouchers, setVouchers] = useState([]);
  const [voucherId, setVoucherId] = useState();
  const [voucherValue, setVoucherValue] = useState(0);
  const [voucherName, setVoucherName] = useState();
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          vi: require("./translations/vietnam.json"),
          en: require("./translations/english.json"),
        },
      })
    );
  });
  // get product from api
  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3001/api/v1/products");
      const product = await response.json();
      console.log("🚀 ~ getProducts ~ product:", product);
      store.dispatch(fetchProducts(product));
    }
    getProducts();
  }, []);
  // get voucher from api
  useEffect(() => {
    async function getVoucher() {
      const response = await fetch("http://localhost:3001/api/v1/vouchers");
      const vouchers = await response.json();
      setVouchers(vouchers);
    }
    getVoucher();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        vouchers,
        totalPrice,
        voucherValue,
        voucherName,
        price,
        voucherId,
        setVoucherId,
        setPrice,
        setVoucherName,
        setVoucherValue,
        setUser,
        setTotalPrice,
      }}
    >
      <ToastProvider placement="bottom-left">
        <BreadcrumbsProvider>
          <Router>
            <ScrollToTop>
              <Suspense
                fallback={
                  <div className="flone-preloader-wrapper">
                    <div className="flone-preloader">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                }
              >
                <Switch>
                  <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />
                  {/* Shop pages */}
                  <Route path={process.env.PUBLIC_URL + "/shop"} component={Shop} />
                  {/* Shop product pages */}
                  <Route
                    path={process.env.PUBLIC_URL + "/product/:id"}
                    render={(routeProps) => <ProductFixedImage {...routeProps} key={routeProps.match.params.id} />}
                  />
                  {/* Other pages */}
                  <Route path={process.env.PUBLIC_URL + "/about"} component={About} />
                  <Route path={process.env.PUBLIC_URL + "/contact"} component={Contact} />
                  <Route path={process.env.PUBLIC_URL + "/my-account"} component={MyAccount} />
                  <Route
                    path={process.env.PUBLIC_URL + "/login-register"}
                    component={(!user && LoginRegister) || Home}
                  />
                  <Route path={process.env.PUBLIC_URL + "/cart"} component={Cart} />
                  <Route path={process.env.PUBLIC_URL + "/wishlist"} component={Wishlist} />
                  <Route path={process.env.PUBLIC_URL + "/compare"} component={Compare} />
                  <Route path={process.env.PUBLIC_URL + "/checkout"} component={Checkout} />
                  <Route path={process.env.PUBLIC_URL + "/not-found"} component={NotFound} />
                  <Route path={process.env.PUBLIC_URL + "/check-out-complete"} component={CheckOutComplete} />
                  <Route exact component={NotFound} />
                </Switch>
              </Suspense>
            </ScrollToTop>
          </Router>
        </BreadcrumbsProvider>
      </ToastProvider>
    </UserContext.Provider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
