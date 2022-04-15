import React, { useState } from "react";
import Event from "./components/Event";
import SelectedEvent from "./components/SelectedEvent";
import Filter from "./components/Filter";
import { useData, useUserState } from "./utils/firebase.js"
import Login from "./components/Login";

const App = () => {
  const [data, loading, error] = useData('/');

  const [filters, setFilters] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [user] = useUserState();

  if (!user) return <Login/>;
  console.log(user);
  if (!user.email.endsWith("northwestern.edu")) return <div>You're not allowed</div>

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  const events = data.events;
  const filterOptions = data.filters;

  const numElementsShared = (arr1, arr2) => (
    arr2.length === 0 ? 1: arr1.reduce((acc, val) => (arr2.includes(val) ? acc + 1 : acc), 0)
  );

  const eventResults = events
    .map(event => [numElementsShared(event.meta.filters, filters), event])
    .filter(([count, _]) => count > 0)
    .sort((a, b) => a[1].time - b[1].time)
    .sort((a, b) => b[0] - a[0])
    .map(([_, event]) => event);

  return (
    <div style={{backgroundColor: '#EEE', minHeight: '100vh'}}>
      <nav style={{backgroundColor: '#4e2a84'}} className="navbar">
        <div className="container-fluid">
          <span className="navbar-brand" style={{fontWeight: '800', color: 'white'}} onClick={ () => (selectedEvent) && setSelectedEvent(null) }>
          {
            selectedEvent&& (<span style={{ paddingRight: "1em" }}>❮</span>)
          }
            Happening
          </span>

        </div>

      </nav>
      <div className='container'>
        {
        selectedEvent ? (
          <SelectedEvent event={ selectedEvent } recommendedEvents={ events.filter( event => event.title !== selectedEvent.title) }/> 
        ) :
        <>
          <div style={{ margin: '.4em'}}>
            <Filter filters={ filters } setFilters={ setFilters } filterOptions={ filterOptions } />
          </div>
          <div>
            { eventResults.map((event, index) => <Event onClick={ () => setSelectedEvent(event) } event={ event } key={ index }/>) }
          </div>
        </>
        }
      </div>
    </div>
  );
}

export default App;
