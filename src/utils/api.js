import { useEffect, useState } from 'react';

export const useEvents = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    fetch('https://cs394-happening.herokuapp.com/events', {signal: abortController.signal})
      .then( (res) => res.json())
      .then((res) => {
        console.log(res)
        setLoading(false);
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err.toString())) 

    return () => {
      abortController.abort();
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

    fetch(`https://cs394-happening.herokuapp.com/user/${user._id}/rsvp`, {signal: abortController.signal})
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
  console.log(user, event);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email
    }),
  };
  fetch(`https://cs394-happening.herokuapp.com/events/${event._id}/rsvp`, options)
    .then((res) => {
      if (!res.ok) console.log('Not okay', res);
    });
}
