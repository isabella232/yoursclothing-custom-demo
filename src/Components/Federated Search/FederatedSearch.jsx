import React from 'react';

// ALGOLIA IMPORT
import { Configure, Index } from 'react-instantsearch-dom';

// COMPONENT IMPORT
import { CustomHits } from '../Searchpage/Hits';
import CustomSuggestions from '../Searchpage/Suggestions';



const FederatedSearch = () => {
    return (
        <div className="federatedSearch">
            <div className="federatedSearch-wrapper">
                <div className="federatedSearch-suggestions">
                    <h3>Suggestions</h3>
                    <Index indexName={window.indexSugg} indexId="suggestions">
                    <Configure hitsPerPage={6} />
                    <CustomSuggestions />
                    </Index>
                </div>
                <div className="federatedSearch-products">
                    <div className="product-federated-header">
                        {/* <CustomSearchBox /> */}
                        <h3 className="federated-title">Products</h3>
                    </div>
                    <Configure hitsPerPage={6} />
                    <CustomHits />
                </div>
            </div>
        </div>
    );
};

export default FederatedSearch;
