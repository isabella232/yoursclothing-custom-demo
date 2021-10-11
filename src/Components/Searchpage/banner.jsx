import React from "react";
import { connectQueryRules } from 'react-instantsearch-dom';

const QueryRuleCustomDatas = ({ items }) => {
    return (
        items.map(({ title, banner }) => {
            if (!banner) {
                return null
            }
            return (
                <div className="banner-wrapper">
                    <div className="banner-overlay"></div>
                    <div className="title-banner-wrapper">
                        <h2>{title}</h2>
                        <div className='underline'></div>
                    </div>
                    <img src={banner} alt="addBanner" />
                </div>

            )
        })
    )
}


const CustomQueryRuleCustomData = connectQueryRules(QueryRuleCustomDatas);

const Banner = () => {
    return (
        <div>
            <CustomQueryRuleCustomData />
        </div>
    )

}

export default Banner