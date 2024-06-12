import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";

const TabProductTwo = ({ spaceBottomClass, category }) => {
  console.log("🚀 ~ TabProductTwo ~ category:", category);
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitle titleText="ƯU ĐÃI HÀNG NGÀY!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav variant="pills" className="product-tab-list pt-30 pb-55 text-center">
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>Sản phẩm mới</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Sản phẩm bán chạy</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sản phẩm giảm giá</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row three-column">
                <ProductGridTwo category={category} type="new" limit={3} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row three-column">
                <ProductGridTwo category={category} type="bestSeller" limit={3} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row three-column">
                <ProductGridTwo category={category} type="saleItems" limit={3} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6" to={process.env.PUBLIC_URL + "/shop"}>
            XEM THÊM SẢN PHẨM KHÁC
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductTwo.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductTwo;
