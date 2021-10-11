import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Highlight,
    SortBy,
    Stats,
    connectHits,
} from 'react-instantsearch-dom';
import { showModalPDP, productDetail } from '../../actions/productDetail';
import { federatedSearchVisible, searchVisible } from '../../actions/visibility';
import ProductDetails from '../ProductsDetails/ProductsDetails';

import { motion, AnimateSharedLayout } from 'framer-motion';




// MAIN SEARCH RESULT PAGE + FEDERATED
const Hits = ({ hits }) => {
const dispatch = useDispatch()
  const listItem = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: {
        delay: 0.2
    } }
  };
    return (
        <AnimateSharedLayout>
            <div className="hits-wrapper">
                    <ul  className="hits-list">
                        {hits.map((hit) => (
                            <motion.li  key={hit.objectID}  variants={listItem} initial="hidden" animate="show" className="hit-list" onClick={
                                () => {
                                    dispatch(productDetail(hit))
                                    dispatch(showModalPDP(true))
                                    dispatch(federatedSearchVisible(false))
                                    dispatch(searchVisible(true)) 
                                }
                            }
                        
                            >
                                <div className="image-wrapper">
                                    <img src={hit.image_link} alt="" />
                                </div>
                                <div className="infos">
                                    <h3><Highlight
                                        hit={hit}
                                        attribute="title"
                                    /></h3>
                                    <p>$ {hit.price}.00</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                    <ModalProduct/>
            </div>
        </AnimateSharedLayout>
    );
}

// PDP
const HitsModal = ({ hits }) => {
    const dispatch = useDispatch()

    return (
        <div className="hits-wrapper">
            <ul className="hits-list hits-list-modal">
                {hits.map((hit) => (
                    <li key={hit.objectID} className="hit-list" onClick={()=> {
                        dispatch(productDetail(hit))
                            dispatch(showModalPDP(true))
                            dispatch(federatedSearchVisible(false))
                            dispatch(searchVisible(true)) 
                    }}>
                        <div className="image-wrapper">
                            <img src={hit.image_link} alt="" />
                        </div>
                        <div className="infos">
                            <h3><Highlight
                                hit={hit}
                                attribute="title"
                            /></h3>
                            <p>$ {hit.price}.00</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const ModalProduct = () => {
    const dispatch = useDispatch()
    const { showModal } = useSelector(state => state.productDetail);
    return(
        <div>
                {showModal ? (
                <div
                    className="modal-bg"
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            dispatch(showModalPDP(false));
                        }
                    }}
                >
                    <motion.div 
                    className="modal-wrapper fadeModal">
                        <ProductDetails />
                    </motion.div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

const CustomHits = connectHits(Hits);
const CustomHitsModal = connectHits(HitsModal);

export { CustomHits, CustomHitsModal }
