import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ALGOLIA IMPORT
import { Configure, Index, QueryRuleCustomData,connectQueryRules } from "react-instantsearch-dom";

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
          <ContentInjected/>
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
    </div>
  );
};

const RecentSearches = () => {
  const getSearches = localStorage.getItem("recentSearches");
  const cleanSearches = JSON.parse(getSearches);
  if (cleanSearches) {
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

const InjectedContent = ({items}) => {
    return(
   <div className="injectedContent__wrapper">  
       {
      items.map(({ button, img, target, titleContent }) => {
        if (titleContent) {
          return (
              <div className="injected-content">
                <img src={img} alt={titleContent} />
                <h3>{titleContent}</h3>
                <a href={target}>{button}</a>
              </div>          
          );
        }
     })
    }
 </div>
   ) }


const ContentInjected = connectQueryRules(InjectedContent);

export default FederatedSearch;
