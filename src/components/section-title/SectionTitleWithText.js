import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Chào mừng tới Techzones</h1>
          <p>
            Giao diện dễ sử dụng, thao tác mua hàng đơn giản, giá cả sản phẩm cạnh tranh, có nhiều chương trình khuyến
            mãi, voucher giảm giá và giao hàng nhanh chóng, thanh toán dễ dàng và có chính sách đổi trả linh hoạt.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
