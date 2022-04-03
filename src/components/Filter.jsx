import React, { useState } from "react";

const Filter = ({ filters, setFilters, filterOptions }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ border: "solid 1px #333" }}>
            <div>
                
            </div>
            <button className="btn btn-primary" onClick={() => setExpanded(true)}>Add Filters</button>
            {
                (expanded)&& (
                    filterOptions.map(option => <button>{option}</button>)
                )
            }

        </div>
    )
}

export default Filter;