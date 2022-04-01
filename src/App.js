import React from "react";
import Event from "./components/Event";
import { useData } from "./utils/firebase.js"

const App = () => {
  const [events, loading, error] = useData('/events'); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>


  return (
    <div className='container'>
      <h1>Happening Please Work</h1>
      <div>
        {events.map((event, index) => <Event event={ event } key={ index }/>)}
      </div>
    </div>
  );
}

export default App;
