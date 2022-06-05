import React, { useState, useEffect} from "react";
import { rsvpToEvent, cancelRsvpToEvent } from "../utils/api";
import { useUserState } from "../utils/firebase";
import styles from "./SelectedEvents.module.css";
import DateView from "./DateView";


const SelectedEvent = ({ event }) => {
  const [rsvpCount, setRsvpCount] = useState(event.rsvp.length);
  const [didRsvp, setDidRsvp] = useState(false);
  const [user] = useUserState();

  useEffect(() => {
    setRsvpCount(event.rsvp.length)
    setDidRsvp(user && event.rsvp.includes(user._id))
  }, [user, event])

  let date;
  // Javascript date in ms??!?!?!??! Need to multiply by 1000
  date = new Date();
  date.setTime(event.time * 1000);

  const handleRsvp = () => {
    if (didRsvp) {
      cancelRsvpToEvent(user, event);
      setRsvpCount(rsvpCount - 1);
      setDidRsvp(false);
      // unrsvp
    } else {
      rsvpToEvent(user, event);
      setRsvpCount(rsvpCount + 1);
      setDidRsvp(true);
    }
  }

  return(
      <div data-testid={'selectedEventCard'}>
        <div>
          <img src={ event.pictureUrl } alt="Event" className={styles.eventImage}/>
        </div>
        <div>
          <div>
            <h4>{ event.title }</h4>
            <div>
              {
                 event.filters.map((option, idx) => (
                  <span key={idx} style={{margin: ".2em", border: 'none'}} className={'badge rounded-pill bg-secondary'}>
                    { option }
                  </span>
                ))
              }
            </div>
            {
              date && (<DateView date={date}/>)
            }
            {
              event.location && (
                <div>{ event.location }</div>
              )
            }
            {
              event.groupSize && (
                <div>{ `👥: ${ event.groupSize }` }</div>
              )
            }
          </div> 
          <div style={{lineHeight:'1.1em'}}>{ event.description }</div>
          <div style={{padding:"1em", backgroundColor:"#d9d9d9", margin:".5em", width:"90%", borderRadius:"15px"}}>
            <p style={{marginBottom:"0.25em"}}>Number of attendees { rsvpCount }</p>
            {
              didRsvp ? (
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => handleRsvp()}
              >Cancel RSVP</button>
              ) : (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleRsvp()}
                >RSVP Now</button>
              )
            }
          </div>
        </div>
        
      </div>
    )
}

export default SelectedEvent;