import React from "react";

const Event = ({ event, onClick }) => {
  let date;
  if (event.time) {
    // Javascript date in ms??!?!?!??! Need to multiply by 1000
    date = new Date();
    date.setTime(event.time * 1000);
  } 

  return(
    <div className="card" onClick={ onClick } style={{display: "flex", flexDirection: "row", margin: '.5em', border: 'solid 1px #888'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={ event.pictureUrl } alt="Event" style={{height: "6em", width:"6em", margin: '0.5em 0.5em', borderRadius: '15px'}}/>
      </div>
      <div>
        <div style={{marginBottom: '.4em'}}>
          <h4 style={{margin: '0'}}>{ event.title }</h4>
          {
            date && (
              <div>{ date.toLocaleString() }</div>
            )
          }
          {
            event.groupSize && <div>👥: { event.groupSize }</div>
          }
        </div> 
        <div>{ event.description }</div>
      </div>
      
    </div>
  )
}

export default Event;