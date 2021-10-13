import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Highlight, connectHits } from "react-instantsearch-dom";
import { showModalPDP, productDetail } from "../../actions/productDetail";
import {
  federatedSearchVisible,
  searchVisible,
} from "../../actions/visibility";
import ProductDetails from "../ProductsDetails/ProductsDetails";

// RECOMMEND
// Recommendation
import recommendations from "../../recommendation/recommendationdemo_recommendations.json";
import { showRecommendations } from "../../actions/productDetail";

import { index } from "../../recommendation/client";

import { motion, AnimateSharedLayout } from "framer-motion";

// MAIN SEARCH RESULT PAGE + FEDERATED
const Hits = ({ hits }) => {
  const dispatch = useDispatch();
  const listItem = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
      },
    },
  };

  return (
    <AnimateSharedLayout>
      <div className="hits-wrapper">
        <ul className="hits-list">
          {hits.map((hit) => (
            <motion.li
              key={hit.objectID}
              variants={listItem}
              initial="hidden"
              animate="show"
              className="hit-list"
              onClick={() => {
                dispatch(productDetail(hit));
                dispatch(showModalPDP(true));
                dispatch(federatedSearchVisible(false));
                dispatch(searchVisible(true));
                const products = [];
                if (!hit) return "";
                const objectRecommendations = recommendations[hit.objectID];
                if (!objectRecommendations) return "";
                for (const [id, score] of Object.entries(
                  objectRecommendations
                )) {
                  index.getObject(id).then((hit) => {
                    products.push(hit);
                    dispatch(showRecommendations(products));
                  });
                }
              }}
            >
              <div className="image-wrapper">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6445 4.82289C17.6445 2.22389 15.5325 0.108887 12.9355 0.108887C11.3105 0.108887 9.85047 0.922886 8.99647 2.22589C8.13147 0.921886 6.65347 0.108887 5.06547 0.108887C2.46847 0.108887 0.355469 2.22389 0.355469 4.82289C0.355469 5.27689 0.418469 5.72289 0.542469 6.14889C0.943469 8.33289 3.62247 10.8529 6.21347 13.2899C7.11447 14.1369 7.96547 14.9369 8.68947 15.6939C8.81347 15.8229 8.98247 15.8929 9.15447 15.8929C9.23547 15.8929 9.31647 15.8779 9.39447 15.8469C9.53247 15.7919 9.64347 15.6919 9.71347 15.5689C10.7615 14.2939 11.9765 13.1139 13.1535 11.9709C15.3435 9.84389 17.2385 8.00289 17.4675 6.11189C17.5855 5.69689 17.6445 5.26489 17.6445 4.82289ZM16.2165 5.79989C16.2045 5.83889 16.1975 5.87889 16.1925 5.91889C16.0455 7.36489 14.2045 9.15289 12.2565 11.0449C11.1965 12.0749 10.1045 13.1349 9.11247 14.2829C8.49247 13.6619 7.80947 13.0209 7.09647 12.3499C4.75847 10.1509 2.10747 7.65889 1.80547 5.89089C1.80147 5.86589 1.79547 5.83989 1.78747 5.81489C1.69247 5.49889 1.64347 5.16489 1.64347 4.82289C1.64347 2.93389 3.17847 1.39689 5.06547 1.39689C6.38947 1.39689 7.60747 2.17489 8.17047 3.37889C8.18447 3.40989 8.20147 3.43989 8.22047 3.46789C8.31747 3.61089 8.38947 3.74189 8.44747 3.88089C8.55247 4.13089 8.79947 4.28589 9.07347 4.27489C9.34447 4.26089 9.57747 4.07989 9.65747 3.82089C10.1015 2.37189 11.4185 1.39789 12.9345 1.39789C14.8205 1.39789 16.3555 2.93489 16.3555 4.82389C16.3565 5.15989 16.3095 5.48889 16.2165 5.79989Z"
                    fill="#DD3B93"
                  />
                </svg>
                <img src={hit.image_link} alt="" />
              </div>
              <div className="infos">
                <h3>
                  <Highlight hit={hit} attribute="title" />
                </h3>
                <div className="price__wrapper">
                  <p className="price">$ {hit.price} GBP</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <ModalProduct />
      </div>
    </AnimateSharedLayout>
  );
};

// PDP
const HitsModal = ({ hits }) => {
  const dispatch = useDispatch();

  return (
    <div className="hits-wrapper">
      <ul className="hits-list hits-list-modal">
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className="hit-list"
            onClick={() => {
              dispatch(productDetail(hit));
              dispatch(showModalPDP(true));
              dispatch(federatedSearchVisible(false));
              dispatch(searchVisible(true));
            }}
          >
            <div className="image-wrapper">
              <img src={hit.image_link} alt="" />
            </div>
            <div className="infos">
              <h3>
                <Highlight hit={hit} attribute="title" />
              </h3>
              <div className="price__wrapper">
                <p className="price">$ {hit.price} GBP</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HitsBoughtTogether = ({}) => {
  const dispatch = useDispatch();
  const recommendation = useSelector(
    (state) => state.productDetail.recommendations
  );

  return (
    <div className="hits-wrapper">
      <ul className="hits-list hits-list-modal">
        {recommendation.map((hit) => (
          <li
            key={hit.objectID}
            className="hit-list"
            onClick={() => {
              dispatch(productDetail(hit));
              dispatch(showModalPDP(true));
              dispatch(federatedSearchVisible(false));
              dispatch(searchVisible(true));
            }}
          >
            <div className="image-wrapper">
              <img src={hit.image_link} alt="" />
            </div>
            <div className="infos">
              <h3>
                <p>{hit.title}</p>
              </h3>
              <div className="price__wrapper">
                <p className="price">$ {hit.price} GBP</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ModalProduct = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.productDetail);
  return (
    <div>
      {showModal ? (
        <div
          className="modal-bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              dispatch(showModalPDP(false));
            }
          }}
        >
          <motion.div className="modal-wrapper fadeModal">
            <ProductDetails />
          </motion.div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const CustomHits = connectHits(Hits);
const CustomHitsModal = connectHits(HitsModal);
const CustomHitsTogether = connectHits(HitsBoughtTogether);

export { CustomHits, CustomHitsModal, CustomHitsTogether };
