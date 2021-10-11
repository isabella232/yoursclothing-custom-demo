import React from 'react';
import { connectHits, Highlight } from 'react-instantsearch-dom';

import { useDispatch } from 'react-redux';

import { getQuery } from '../../actions/getQuery';

// UNIQBY LIB
import uniqBy from 'lodash.uniqby';
import {
    federatedSearchVisible,
    searchVisible
} from '../../actions/visibility';

const Suggestions = ({ hits }) => {
    const dispatch = useDispatch();
    const unique = uniqBy(hits, 'ProductTypeDesc');
    return (
        <div className="suggestions-container">
            {hits.map(hit => {
                return (
                    <div
                        key={hit.query}
                        className="suggestion"
                        onClick={e => {
                            dispatch(getQuery(hit.query));
                            dispatch(searchVisible(true));
                            dispatch(federatedSearchVisible(false));
                        }}
                    >
                         <Highlight hit={hit} attribute="query" />
                        {/* <Highlight attribute='ProductTypeDesc' hit={hit.label} /> */}
                        {/* <p>{hit._highlightResult.ProductTypeDesc.value}</p> */}
                    </div>
                );
            })}
        </div>
    );
};

const CustomSuggestions = connectHits(Suggestions);

export default CustomSuggestions;
