import React from "react";

const DateView = ({date}) => (
    <div>
        <div>
            {date.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}
            {" "}
            {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
        </div>
    </div>
)

export default DateView