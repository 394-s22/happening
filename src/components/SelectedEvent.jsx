import React from "react";

const SelectedEvent = ({ event }) => {
    let date;
    if (event.time) {
        // Javascript date in ms??!?!?!??! Need to multiply by 1000
        date = new Date();
        date.setTime(event.time * 1000);
    } 

    return(
        <div>
          <div>
            <img src={ event.pictureUrl } alt="Event" style={{width:"80%", margin: '0.5em auto', borderRadius: '15px'}}/>
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
          </div>
          
        </div>
      )
}

export default SelectedEvent;