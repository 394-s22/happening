import React from "react";

const Event = ({ event }) => {

  return(
    <div className="card" style={{display: "flex", flexDirection: "row"}}>
      <div>
        <img src={ event.pictureUrl } alt="Event" style={{height: "8em", width:"8em"}}/>
      </div>
      <div>
        <h3>{ event.title }</h3>
        <div>{ event.description }</div>
        <div>{ event.groupSize }</div>
        <div>{ event.time }</div>
      </div>
      
    </div>
  )
}

export default Event;