import React from 'react'
import { useSelector } from "react-redux";
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
export const CarouselTrendy = () => {
    const {persona} = useSelector(state => state.selectedPersona)
    return (    
    <Index
        indexName={window.index}    
        indexId= "trendy_carousel">
        <Configure hitsPerPage={8} ruleContexts='trendy' userToken={persona} />
        <CustomHitsModal />
    </Index> );
}
 
