import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import SectionTitle from "../../components/section-title/SectionTitle";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import TabProductTwo from "../../wrappers/product/TabProductTwo";

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Techzones | Phone </title>
        <meta name="description" content="Phone" />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderNine />
        {/* section title */}
        <SectionTitle
          titleText={"Techzones"}
          subtitleText={
            "Techzones là trang web chuyên cung cấp điện thoại di động, chất lượng cao với giá cả hợp lý. Chúng tôi cam kết mang đến cho khách hàng sự hài lòng tuyệt đối với trải nghiệm mua sắm trực tuyến an toàn và tiện lợi."
          }
          subtitleColorClass={"title"}
          spaceClass={"welcome-content pt-95 pb-90"}
          positionClass={"text-center"}
        />
        {/* tab product */}
        <TabProductTwo spaceBottomClass="pb-70" category="Điện thoại" sectionTitle={false} />
        {/* feature */}
        <div className="pb-50">
          <FeatureIconThree />
        </div>
        {/* newsletter */}
        <NewsletterTwo spaceBottomClass="pb-100" />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
