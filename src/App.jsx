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

  const numElementsShared = (arr1, arr2) => (
    arr1.reduce((acc, val) => (arr2.includes(val) ? acc + 1 : acc), 0)
  );

  const eventResults = events
    .map(event => [numElementsShared(event.meta.filters, filters), event])
    .filter(([count, _]) => count > 0)
    .sort((a, b) => b[0] - a[0])
    .map(([_, event]) => event);

  return (
    <div className='container'>
      <h1>Happening</h1>
      <div>
        <Filter filters={ filters } setFilters={ setFilters } filterOptions={ filterOptions } />
      </div>
      <div>
        {
          filters.length !== 0 ? (
            eventResults.map((event, index) => <Event event={ event } key={ index }/>)
          ) : (
            events.map((event, index) => <Event event={ event } key={ index }/>)
          )
        }
      </div>
    </div>
  );
}

export default App;
