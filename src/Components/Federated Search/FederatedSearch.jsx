import React from 'react';

// ALGOLIA IMPORT
import { Configure, Index } from 'react-instantsearch-dom';

// COMPONENT IMPORT
import { CustomHits } from '../Searchpage/Hits';
import { StoreQueryToLocalStorage } from '../Searchpage/SearchBox';
import CustomSuggestions from '../Searchpage/Suggestions';



const FederatedSearch = () => {
  
    return (
        <div className="federatedSearch">
            <div className="federatedSearch-wrapper">
                <div className="federatedSearch-recentSearches">    
                    <RecentSearches/>
                </div>
              
                <div className="federatedSearch-products">
                    <div className="product-federated-header">
                        {/* <CustomSearchBox /> */}
                        <h3 className="federated-title">Products</h3>
                    </div>
                    <Configure hitsPerPage={6} />
                    <CustomHits />
                </div>
                <div className="federatedSearch-suggestions">
                    <h3>Suggestions</h3>
                    <Index indexName={window.indexSugg} indexId="suggestions">
                    <Configure hitsPerPage={6} />
                    <CustomSuggestions />
                    </Index>
                </div>
            </div>
        </div>
    );
};

const RecentSearches = () => {
    const getSearches = localStorage.getItem('recentSearches')
    const cleanSearches = JSON.parse(getSearches)
    if(cleanSearches){
    return (
        <div>
             <h3 className="federated-title">Recent Searches</h3>
    {cleanSearches.map((search, index) => {
        return(<p key={index}>{search}</p>)
    })}
    </div>
    )
    
    } 
    else {return ''}
}


export default FederatedSearch;


