import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { useSelector } from "react-redux";
import algoliasearch from 'algoliasearch/lite';

//CSS / SCSS

import './SCSS/index.scss';

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchpage/SearchResult';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    const {persona} = useSelector(state => state.selectedPersona)
    const searchClient = algoliasearch(window.appID, window.key);
    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName={window.index}>
                <Configure userToken={persona}/>
                <Header />
                <SearchResults />
                <Homepage />
            </InstantSearch>
        </div>
    );
};

export default App;
