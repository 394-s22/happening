import React, { useState } from "react";

const FilterButton = ({ text, variant, ...props }) => {
    return(
        <button style={{margin: ".2em", border: 'none'}} className={`badge rounded-pill bg-${variant}`} {...props}>{ text }</button>
    )
}

const Filter = ({ filters, setFilters, filterOptions }) => {
  const [expanded, setExpanded] = useState(false);

  const addFilter = (f) => setFilters([...filters, f]);
  const removeFilter = (f) => setFilters(filters.filter(selected => selected !== f));

  return (
    <div style={{ background: 'white', border: "solid 1px #333", borderRadius: '5px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{flexGrow: '1'}}>
          {
            (filters.length > 0) ? (
              filters.map((f, idx) => <FilterButton key={idx} data-testid={'selected-filter-' + f} text={"✕ "+f} variant={ "success" }onClick={() => removeFilter(f)}/>)
            ) : (
              <button 
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left'}}
                onClick={() => setExpanded(!expanded)}
                data-cy="btn-filter"
                data-testid="btn-filter"
              >
                Add filters...
              </button>   
            )
          }
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', borderLeft: 'solid 1px #333', flexGrow: '0'}}
          data-testid="expand-filters"
        >
          { expanded ? '▲' : '▼'}
        </button>
      </div>
          
      {
        (expanded) && (
          <div style={{ borderTop: '1px solid #333' }}>
            {
              filterOptions.filter(option => !filters.includes(option)).map((option, idx) => (
                <FilterButton key={idx} text={ option } variant={ "secondary" } onClick={() => addFilter(option)} />))
            }
          </div>
        )
      } 

    </div>
  );
}

export default Filter;