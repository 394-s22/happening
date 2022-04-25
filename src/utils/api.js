import { useEffect, useState } from 'react';

const BASE_URL = 'https://cs394-happening.herokuapp.com';
//const BASE_URL = 'http://localhost:8081';

export const useEvents = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    const interval = setInterval(() => {
      console.log('Fetching new data');
      fetch(`${BASE_URL}/events`, {signal: abortController.signal})
        .then( (res) => res.json())
        .then((res) => {
          setData({...res});
          setLoading(false);
          setError(null);
        })
        .catch((err) => setError(err.toString())) 
    }, 1000);

    return () => {
      abortController.abort();
      clearInterval(interval);
    }
  }, [])

  return [data, loading, error];
}

export const useUserRsvpEvents = (user) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${BASE_URL}/user/${user._id}/rsvp`, {signal: abortController.signal})
      .then((res) => res.json())
      .then((data) => {
        setData(data.rsvp);
        setError(null);
        setLoading(false);
      })
      .catch((err) => setError(err.toString()));

    return () => {
      abortController.abort();
    }
  }, [user]);

  return [data, loading, error];
}

export const rsvpToEvent = (user, event) => {
  
  const options = {
    method: 'POST',
  };
  fetch(`${BASE_URL}/events/${event._id}/rsvp/${user._id}`, options)
    .then((res) => {
      if (!res.ok) console.log('Not okay', res);
    });
}

export const cancelRsvpToEvent = (user, event) => {
  
  const options = {
    method: 'DELETE',
  };
  fetch(`${BASE_URL}/events/${event._id}/rsvp/${user._id}`, options)
    .then((res) => {
      if (!res.ok) console.log('Not okay', res);
    });
}
