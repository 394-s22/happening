import React from "react";

const Event = ({ event }) => {

  return(
    <div className="card">
      <h3>{ event.title }</h3>
      <p>{ event.description }</p>
      <p>{ event.groupSize }</p>
      <p>{ event.time }</p>
      <img src={ event.pictureUrl } alt="Event"/>
    </div>
  )
}

export default Event;