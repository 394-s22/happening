import React, { useState } from "react";

const Filter = ({ filters, setFilters, filterOptions }) => {
  const [expanded, setExpanded] = useState(false);

  const addFilter = (f) => setFilters([...filters, f]);
  const removeFilter = (f) => setFilters(filters.filter(selected => selected !== f));

  return (
    <div style={{ border: "solid 1px #333" }}>
      <div>
        <button className="btn btn-primary" onClick={() => setExpanded(!expanded)}>Add Filters</button>
        { filters.map((f, idx) => <button key={idx} onClick={() => removeFilter(f)}>{f}</button>) }    
      </div>
          
      {
        (expanded) && (
          filterOptions.filter(option => !filters.includes(option)).map((option, idx) => <button key={idx} onClick={() => addFilter(option)} >{option}</button>)
        )
      }

    </div>
  );
}

export default Filter;