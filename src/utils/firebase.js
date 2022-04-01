import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDbPLNOw-aNP1If_jvYWHg-gnBfk_rW3pU",
  authDomain: "cs394-happening.firebaseapp.com",
  databaseURL: "https://cs394-happening-default-rtdb.firebaseio.com",
  projectId: "cs394-happening",
  storageBucket: "cs394-happening.appspot.com",
  messagingSenderId: "162054499427",
  appId: "1:162054499427:web:551e1194e3bd2d36585c56"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) console.log(`loading ${path}`);

    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) console.log(val);
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};