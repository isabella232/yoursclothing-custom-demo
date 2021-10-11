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
const HeirarchicalCategoriesFilter = ({ title, items, refine, createURL }) => {
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
              <HierarchicalMenu
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

const HierarchicalMenu = connectHierarchicalMenu(HeirarchicalCategoriesFilter);

// expects an attribute which is an array of items
const RefinementList = ({ title, items, refine }) => {
  return (
    <div className="filters-content">
      <div className="title">
        <h3>{title}</h3>
        <p>-</p>
      </div>
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
        {/* <ExperimentalDynamicWidgets
                 fallbackComponent={Menu}
                 > */}
        {/* <HierarchicalMenu attribute={window.hierarchicalCategoriesAttribute} /> */}
        {window.refinementListAttributes.map((e) => (
          <GenericRefinementList attribute={e} />
        ))}
        {/* {window.priceAttribute[0].value !== '' && <GenericRangeSlider attribute={window.priceAttribute[0].value} min={10} max={550} />} */}
        <GenericRangeSlider attribute="price[0].value" min={10} max={550} />
        {/* </ExperimentalDynamicWidgets> */}
      </div>
    </div>
  );
};

export { CustomFilters };
