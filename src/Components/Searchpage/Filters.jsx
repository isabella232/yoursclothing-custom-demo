import React, { useState } from "react";

// ALGOLIA'S IMPORT
import {
  connectRefinementList,
  connectHierarchicalMenu,
  connectRange,
  ExperimentalDynamicWidgets,
} from "react-instantsearch-dom";

// COMPONENTS IMPORT
import CustomStateResults from "./StateResults";

// Prerequisite: install rheostat@4
import "rheostat/initialize";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";

// expects an attribute which is formated as a hierarchy
// see https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#hierarchical-facets
const HierarchicalCategoriesFilter = ({ title, items, refine, createURL }) => {
  const [category, setcategory] = useState(true);
  return (
    <div className="filters-content">
      <div
        onClick={() => {
          setcategory(!category);
        }}
        className="title"
      >
        <h3>{title}</h3>
        <p>-</p>
      </div>
      <ul
        className={`filter-list-content ${
          category ? "active-filters" : "hidden-filters"
        }`}
      >
        {items.map((item) => (
          <li className="filter-list" key={item.label}>
            <a
              className={`button-filter ${
                item.isRefined ? "refined-filter" : ""
              }`}
              href={createURL(item.value)}
              style={{ fontWeight: item.isRefined ? "bold" : "" }}
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              {item.label}
            </a>
            {item.items && (
              <HierarchicalCategoriesFilter
                items={item.items}
                refine={refine}
                createURL={createURL}
              />
            )}
          </li>
        ))}
      </ul>
      <div className="line"></div>
    </div>
  );
};

const HierarchicalMenu = connectHierarchicalMenu(HierarchicalCategoriesFilter);

// expects an attribute which is an array of items
const RefinementList = ({ title, items, refine, searchForItems }) => {
  const [showfacet, setshowfacet] = useState(false);
  return (
    <div className="filters-content">
      <div className="title">
        <h3>{title}</h3>
        <svg
          onClick={() => {
            console.log("JE CLICK");
            setshowfacet(!showfacet);
            console.log(showfacet);
          }}
          className="search-facet-svg"
          viewBox="0 0 897 897"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M357.982 142.492C236.887 142.492 138.404 241.174 138.404 362.265C138.404 483.356 236.887 581.843 357.982 581.843C479.077 581.843 577.755 483.356 577.755 362.265C577.755 241.174 479.077 142.492 357.982 142.492ZM357.982 182.008C457.701 182.008 538.239 262.551 538.239 362.265C538.239 461.977 457.701 542.327 357.982 542.327C258.264 542.327 177.921 461.977 177.921 362.265C177.921 262.551 258.264 182.008 357.982 182.008Z"
            fill="#030A2B"
          />
          <path
            d="M501.254 479.455C497.515 479.851 493.966 481.307 491.024 483.649C488.082 485.99 485.868 489.122 484.643 492.676C483.417 496.231 483.23 500.06 484.103 503.717C484.976 507.375 486.874 510.708 489.574 513.326L671.582 695.334C673.386 697.323 675.575 698.924 678.017 700.039C680.459 701.155 683.103 701.764 685.787 701.825C688.471 701.886 691.139 701.399 693.63 700.395C696.12 699.392 698.38 697.893 700.271 695.988C702.163 694.083 703.647 691.812 704.634 689.315C705.62 686.818 706.087 684.145 706.007 681.461C705.928 678.778 705.302 676.14 704.17 673.705C703.037 671.271 701.421 669.092 699.419 667.303L517.411 485.294C515.33 483.169 512.797 481.539 509.999 480.528C507.202 479.517 504.213 479.151 501.254 479.455Z"
            fill="#030A2B"
          />
        </svg>
      </div>

      <input
        className={`${
          showfacet ? "search-facet" : "search-facet search-facet__hidden"
        }`}
        type="search"
        onChange={(event) => searchForItems(event.currentTarget.value)}
        placeholder="Search"
      />

      <ul className="filter-list-content">
        {items.map((item) => (
          <li className="filter-list" key={item.label}>
            <button
              className={`button-filter ${
                item.isRefined ? "refined-filter" : ""
              }`}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="line"></div>
    </div>
  );
};

const GenericRefinementList = connectRefinementList(RefinementList);

// expects an attribute which is a number (float or int)
const RangeSlider = ({
  title,
  min,
  max,
  currentRefinement,
  canRefine,
  refine,
}) => {
  const [stateMin, setStateMin] = React.useState(min);
  const [stateMax, setStateMax] = React.useState(max);

  React.useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <div className="filters-content">
      <div className="title" style={{ marginBottom: "1em" }}>
        <h3>{title}</h3>
        <p>-</p>
      </div>
      <Rheostat
        min={min}
        max={max}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
        background=""
      >
        <div
          className="rheostat-marker rheostat-marker--large"
          style={{ left: 0 }}
        >
          <div className="rheostat-value">{stateMin}</div>
        </div>
        <div
          className="rheostat-marker rheostat-marker--large"
          style={{ right: 0 }}
        >
          <div className="rheostat-value">{stateMax}</div>
        </div>
      </Rheostat>
    </div>
  );
};

const GenericRangeSlider = connectRange(RangeSlider);

// MAIN COMPONENT
const CustomFilters = ({ filterAnim }) => {
  return (
    <div
      className={`filters-wrapper ${
        filterAnim ? "showWrapperFilter" : "hideWrapperFilter"
      }`}
    >
      <div>
        <CustomStateResults />
        <ExperimentalDynamicWidgets
        // fallbackComponent={Menu}
        >
          <HierarchicalMenu
            attributes={window.hierarchicalCategoriesAttribute}
            title="Categories"
          />
          {window.refinementListAttributes.map((e) => (
            <GenericRefinementList attribute={e} title={e} searchable />
          ))}
          {window.priceAttribute !== "" && (
            <GenericRangeSlider
              attribute={window.priceAttribute}
              min={10}
              max={550}
            />
          )}
        </ExperimentalDynamicWidgets>
      </div>
    </div>
  );
};

export { CustomFilters };
