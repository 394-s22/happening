import React from "react";
import Event from "./Event";

const SelectedEvent = ({ event, recommendedEvents}) => {
    let date;
    if (event.time) {
        // Javascript date in ms??!?!?!??! Need to multiply by 1000
        date = new Date();
        date.setTime(event.time * 1000);
    } 

    return(
        <div>
          <div>
            <img src={ event.pictureUrl } alt="Event" style={{ display: "block", width:"80%", margin: '0.5em auto', borderRadius: '15px'}}/>
          </div>
          <div>
            <div>
              <h4>{ event.title }</h4>
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
            <div style={{marginTop: "2em"}}>
              <h5 style={{textAlign: "center", marginBottom: "0.5em"}}>Nearby Events</h5>
              <div>
                { recommendedEvents.map((event, index) => <Event event={ event } key={ index }/>) }
              </div>
            </div>
          </div>
          
        </div>
      )
}

export default SelectedEvent;