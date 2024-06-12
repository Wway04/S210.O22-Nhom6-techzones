import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const NotFound = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>TechZones | Check Out Complete</title>
        <meta name="description" content="404 page of techzones react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Check out complete</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  {/* <h1>✅</h1> */}
                  <h1 style={{ fontSize: "58px", letterSpacing: 1 }}>Đặt hàng thành công!</h1>
                  <p style={{ fontSize: "20px", marginBottom: "40px" }}>
                    Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi!
                  </p>
                  <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                    Trở về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
