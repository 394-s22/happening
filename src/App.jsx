import React, { useState } from "react";
import Event from "./components/Event";
import SelectedEvent from "./components/SelectedEvent";
import Filter from "./components/Filter";
import { useUserState } from "./utils/firebase"
import Login from "./components/Login";
import Header from "./components/Header";
import { useEvents } from "./utils/api"

const App = () => {
  const [data, loading, error] = useEvents();

  const [filters, setFilters] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [user] = useUserState();
  console.log(user);

  if (!user) return <Login />;

  if (!user.email.endsWith("northwestern.edu")) {
    alert('Please sign in with a university affiliated email address.');
    return <Login />;
  }

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  const events = data.events;
  console.log(data);
  const filterOptions = ["food", "free", "drinks", "active", "outdoors", 
  "indoors", "educational", "nightlife", "entertainment", "shopping" , "music"];

  const numElementsShared = (arr1, arr2) => (
    arr2.length === 0 ? 1: arr1.reduce((acc, val) => (arr2.includes(val) ? acc + 1 : acc), 0)
  );

  const eventResults = events
    .map(event => [numElementsShared(event.filters, filters), event])
    .filter(([count, _]) => count > 0)
    .sort((a, b) => a[1].time - b[1].time)
    .sort((a, b) => b[0] - a[0])
    .map(([_, event]) => event);

  return (
    <div style={{backgroundColor: '#EEE', minHeight: '100vh'}}>
      <Header
        showBackClick={ !!selectedEvent }
        onBackClick={() => setSelectedEvent(null)}
        user={ user }
      />

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
