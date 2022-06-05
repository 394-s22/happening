import React from "react";
import styles from "./event.module.css";
import DateView from "./DateView";

const Event = ({ event, onClick, filterMatches }) => {
  let date;
  if (event.time) {
    // Javascript date in ms??!?!?!??! Need to multiply by 1000
    date = new Date();
    date.setTime(event.time * 1000);
  } 

  return(
    <div className={`card ${styles.eventCard}`} data-testid={'eventCard'}onClick={ onClick } style={{display: "flex", flexDirection: "row", margin: '.5em', border: 'solid 1px #888'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={ event.pictureUrl } alt="Event" style={{height: "6em", width:"6em", margin: '0.5em 0.5em', borderRadius: '15px'}}/>
      </div>
      <div>
        <div style={{marginBottom: '.4em'}}>
          <h4 style={{margin: '0'}}>{ event.title }</h4>
          {
            filterMatches && filterMatches.length > 0 && (
              <div>
                {
                  filterMatches.map((option, idx) => (
                    <span key={idx} style={{margin: ".2em", border: 'none'}} className={'badge rounded-pill bg-success'}>
                      { option }
                    </span>
                  ))
                }
              </div>
            )
          }
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
        <div className={ styles.description } style={{ lineHeight: '1.1em', paddingBottom: '.4em'}}>
          { event.description.length > 80 ? event.description.substr(0, 80).split(' ').slice(0, -1).join(' ') + '...' : event.description }
        </div>
      </div>
      
    </div>
  )
}

export default Event;