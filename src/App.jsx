import React, { useState } from "react";
import Event from "./components/Event";
import Filter from "./components/Filter";
import { useData } from "./utils/firebase.js"

const App = () => {
  const [data, loading, error] = useData('/');

  const [filters, setFilters] = useState([]);
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  const events = data.events;
  const filterOptions = data.filters;

  return (
    <div className='container'>
      <h1>Happening</h1>
      <div>
        <Filter filters={ filters } setFilters={ setFilters } filterOptions={ filterOptions } />
      </div>
      <div>
        {events.map((event, index) => <Event event={ event } key={ index }/>)}
      </div>
    </div>
  );
}

export default App;
