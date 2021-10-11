import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import { CustomHitsModal } from '../Searchpage/Hits';



const CarouselHome = () => {
    const searchClient = algoliasearch(
        window.appID,
        window.key
    );
    return (    
    <InstantSearch
        indexName={window.index}    
        searchClient={searchClient}>
        <Configure hitsPerPage={8} ruleContexts='aviator' />
        <CustomHitsModal />
    </InstantSearch> );
}
 
export default CarouselHome;