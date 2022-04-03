import React from "react";

const Event = ({ event }) => {
  let date;
  if (event.time) {
    // Javascript date in ms??!?!?!??! Need to multiply by 1000
    date = new Date();
    date.setTime(event.time * 1000);
  } 

  return(
    <div className="card" style={{display: "flex", flexDirection: "row"}}>
      <div>
        <img src={ event.pictureUrl } alt="Event" style={{height: "8em", width:"8em"}}/>
      </div>
      <div>
        <h3>{ event.title }</h3>
        <div>{ event.description }</div>
        <div>Suggested Group Size: { event.groupSize }</div>
        {date&& <div>{ date.toLocaleString() }</div>}
      </div>
      
    </div>
  )
}

export default Event;