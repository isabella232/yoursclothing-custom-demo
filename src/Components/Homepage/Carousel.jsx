import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch, Index } from 'react-instantsearch-dom';
import { CustomHitsModal } from '../Searchpage/Hits';



export const CarouselHome = () => {
    const searchClient = algoliasearch(
        window.appID,
        window.key
    );
    return (    
    <InstantSearch
        indexName={window.index}    
        searchClient={searchClient}>
        <Configure hitsPerPage={8} ruleContexts='coat_season' />
        <CustomHitsModal />
    </InstantSearch> );
}
export const CarouselHomeHalloween = () => {
    return (    
    <Index
        indexName={window.index}    
        indexId= "halloween_carousel">
        <Configure hitsPerPage={8} ruleContexts='Halloween_season' />
        <CustomHitsModal />
    </Index> );
}
 
