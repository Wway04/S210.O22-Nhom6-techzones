import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BannerThreeSingle = ({ data, spaceBottomClass }) => {
  console.log("🚀 ~ BannerThreeSingle ~ data:", data);
  return (
    <div className="col-lg-6 col-md-6">
      <div className={`single-banner-2 ${spaceBottomClass ? spaceBottomClass : ""}`}>
        <Link to={process.env.PUBLIC_URL + data.link}>
          <img src={process.env.PUBLIC_URL + data.image} alt="" />
        </Link>
        <div className="banner-content-2" style={{ top: "130px" }}>
          <h3 style={{ color: "#ff1c1c" }}>{data.title}</h3>
          <h4>
            {data.subtitle} <span style={{ color: "#ff1c1c" }}>{data.price}</span>
          </h4>
          <Link to={process.env.PUBLIC_URL + data.link} style={{ color: "#ff1c1c" }}>
            <i className="fa fa-long-arrow-right" style={{ color: "#ff1c1c" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerThreeSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default BannerThreeSingle;
