import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import SectionTitle from "../../components/section-title/SectionTitle";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import TabProductTwo from "../../wrappers/product/TabProductTwo";

const HomeFashionSix = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta name="description" content="Fashion home of flone react minimalist eCommerce template." />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderNine />
        {/* section title */}
        <SectionTitle
          titleText={"Le Mai Quoc Khanh"}
          subtitleText={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat irure"
          }
          subtitleColorClass={"title"}
          spaceClass={"welcome-content pt-95 pb-90"}
          positionClass={"text-center"}
        />
        {/* tab product */}
        <TabProductTwo spaceBottomClass="pb-70" category="fashion" sectionTitle={false} />
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

export default HomeFashionSix;
