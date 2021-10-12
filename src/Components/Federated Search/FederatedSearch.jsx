import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ALGOLIA IMPORT
import { Configure, Index, QueryRuleCustomData } from "react-instantsearch-dom";

// COMPONENT IMPORT
import { CustomHits } from "../Searchpage/Hits";
import { StoreQueryToLocalStorage } from "../Searchpage/SearchBox";
import CustomSuggestions from "../Searchpage/Suggestions";

const FederatedSearch = () => {
  const { persona } = useSelector((state) => state.selectedPersona);
  return (
    <div className="federatedSearch">
      <div className="federatedSearch-wrapper">
        <div className="federatedSearch-recentSearches">
          <RecentSearches />
        </div>

        <div className="federatedSearch-products">
          <div className="product-federated-header">
            {/* <CustomSearchBox /> */}
            <h3 className="federated-title">Products</h3>
          </div>
          <Configure hitsPerPage={6} userToken={persona} />
          <CustomHits />
        </div>
        <div className="federatedSearch-suggestions">
          <h3>Suggestions</h3>
          <Index indexName={window.indexSugg} indexId="suggestions">
            <Configure hitsPerPage={6} userToken={persona} />
            <CustomSuggestions />
          </Index>
        </div>
      </div>

      <QueryRuleCustomData>
        {({ items }) => {
          console.log("items", items);
          return items.map(({ button, img, target, titleContent }) => {
            if (titleContent) {
              return (
                <div>
                  <div className="separator"></div>
                  <div className="injected-content-wrapper">
                    <img src={img} alt={titleContent} />
                    <h3>{titleContent}</h3>
                    <a href={target}>{button}</a>
                  </div>
                </div>
              );
            }
          });
        }}
      </QueryRuleCustomData>
    </div>
  );
};

const RecentSearches = () => {
  const getSearches = localStorage.getItem("recentSearches");
  const cleanSearches = JSON.parse(getSearches);
  if (cleanSearches.length > 0) {
    return (
      <>
        <h3 className="federated-title">Recent Searches</h3>
        <div className="federatedSearch-recentSearches_items">
          {cleanSearches.map((search, index) => {
            return <p key={index}>{search}</p>;
          })}
        </div>
      </>
    );
  } else {
    return "";
  }
};

export default FederatedSearch;
