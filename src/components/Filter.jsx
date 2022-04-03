import React, { useState } from "react";

const FilterButton = ({ text, variant, ...props }) => {
    return(
        <button style={{margin: ".2em"}} className={`badge rounded-pill bg-${variant}`} {...props}>{ text }</button>
    )
}

const Filter = ({ filters, setFilters, filterOptions }) => {
  const [expanded, setExpanded] = useState(false);

  const addFilter = (f) => setFilters([...filters, f]);
  const removeFilter = (f) => setFilters(filters.filter(selected => selected !== f));

  return (
    <div style={{ border: "solid 1px #333" }}>
      <div style={{borderBottom: "solid 1px #333"}}>
        <button className="btn btn-primary" onClick={() => setExpanded(!expanded)}>Add Filters</button>
        { filters.map((f, idx) => <FilterButton key={idx} text={f} variant={ "success" }onClick={() => removeFilter(f)}/>) }    
      </div>
          
      {
        (expanded) && (
          filterOptions.filter(option => !filters.includes(option)).map((option, idx) => (
            <FilterButton key={idx} text={ option } variant={ "secondary" } onClick={() => addFilter(option)} />))
        )
      }

    </div>
  );
}

export default Filter;