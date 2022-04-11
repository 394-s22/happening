import React, { useState } from "react";
import Event from "./Event";

const SelectedEvent = ({ event, recommendedEvents}) => {
  const [rsvpCount, setRsvpCount] = useState(Math.floor(Math.random() * 30));
  const [didRsvp, setDidRsvp] = useState(false);

  let date;
  // Javascript date in ms??!?!?!??! Need to multiply by 1000
  date = new Date();
  date.setTime(event.time * 1000);

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
          <div>
            <p>Number of attendees { rsvpCount }</p>
            {
              didRsvp ? (
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => {setRsvpCount(rsvpCount - 1); setDidRsvp(false)}}
              >Cancel RSVP</button>
              ) : (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {setRsvpCount(rsvpCount + 1); setDidRsvp(true)}}
                >RSVP Now</button>
              )
            }
          </div>
        </div>
        
      </div>
    )
}

export default SelectedEvent;