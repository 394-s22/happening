import React from 'react';
import { useUserRsvpEvents } from '../utils/api';
import Header from './Header';
import Event from './Event';

const MyEvents = ({ user, onBackClick }) => {
  const [events, loading, error] = useUserRsvpEvents(user);
  
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <Header showBackClick={true} onBackClick={onBackClick} user={user} />

      <div className='container'>
        <h1 style={{textAlign: 'center'}}>My Events</h1>
        <div>
          { events.map((event, index) => <Event onClick={ () => {}} event={ event } key={ index }/>) }
        </div>
      </div>  
      
    </div>
  )
}

export default MyEvents;
