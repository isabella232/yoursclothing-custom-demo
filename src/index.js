import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//REACT REDUX CONFIF
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/indexReducer';
import { Provider } from 'react-redux';

// DEV TOOL
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//CREATE STORE +IMPORT ALL REDUCER IN ONE
const store = createStore(
    rootReducer,
    composeEnchancer(applyMiddleware(thunk))
);

//CHANGE ME IF USING NEW INDEX
window.appID = 'JDBD6EJM33';
window.key = '0fe54b2e3991d370c91376981aff9d48';
window.index = 'rayban_merged';

//SORTBY
window.index_asc = 'rayban_merged_price_asc';
window.index_desc = 'rayban_merged_price_dsc';

// QUERY SUGG
window.indexSugg = 'rayban_merged_query_suggestions2';

// DESCRIPTION ABOUT HOW THE FOLLOWING VARIABLES ARE USED
// Please ensure you set your attributes in the following parts of the dashboard first:
// Facets, Facet Display, and any visual editor rules to change the facets
// If you don't see facet display, ask the internal dashboard team to make sure you have the favet ordering feature enabled

// ADD ATTRIBUTES FOR REFINEMENT LISTS TO THE ARRAY, IF NONE LEAVE ARRAY EMPTY
window.refinementListAttributes = ['gender'];

// ADD ATTRIBUTE FOR PRICE, IF NONE LEAVE AS EMPTY STRING
window.priceAttribute = 'price';

// ADD ATTRIBUTE FOR HIERARCHY, IF NONE LEAVE AS EMPTY STRING
window.hierarchicalCategoriesAttribute = 'categories';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
