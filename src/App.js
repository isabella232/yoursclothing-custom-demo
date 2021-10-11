import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

//CSS / SCSS

import './SCSS/index.scss';

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchpage/SearchResult';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    const searchClient = algoliasearch(window.appID, window.key);
    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName={window.index}>
                <Header />
                <SearchResults />
                <Homepage />
            </InstantSearch>
        </div>
    );
};

export default App;
