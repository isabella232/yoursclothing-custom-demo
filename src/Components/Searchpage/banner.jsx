import React from "react";
import { connectQueryRules } from "react-instantsearch-dom";

const QueryRuleCustomDatas = ({ items }) => {
  return items.map((index, { title, img }) => {
    if (!title) {
      return null;
    }
    return (
      <div className="banner-wrapper" key={index}>
        <div className="banner-overlay"></div>
        <div className="title-banner-wrapper">
          <h2>{title}</h2>
          {/* <div className="underline"></div> */}
        </div>
        <img src={img} alt="addBanner" />
      </div>
    );
  });
};

const CustomQueryRuleCustomData = connectQueryRules(QueryRuleCustomDatas);

const Banner = () => {
  return (
    <div>
      <CustomQueryRuleCustomData />
    </div>
  );
};

export default Banner;
