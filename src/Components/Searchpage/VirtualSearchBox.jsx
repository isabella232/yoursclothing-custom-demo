import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ALGOLIA'S IMPORT
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({
    refine,
    setQuery,
    currentRefinements
}) => {
    const query = useSelector(
        state => state.getQuery.query
    );
    refine(query)
    return null
}


const VirtualSearchBox = connectSearchBox(SearchBox);

export default VirtualSearchBox;