import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD9LFQW6v8muU7bdl4EE3fh0c-IdeELNUo",
  authDomain: "client-project-5de94.firebaseapp.com",
  databaseURL: "https://client-project-5de94-default-rtdb.firebaseio.com",
  projectId: "client-project-5de94",
  storageBucket: "client-project-5de94.appspot.com",
  messagingSenderId: "957126938870",
  appId: "1:957126938870:web:f0b21e3e40d5647acf9cd7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

export const useApiData = (locationId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    // use full url in deployment
    // const url = 'https://poatek-hub-api.azurewebsites.net/api/reports/office/collaboratorsByOffice?Date=2023-05-17&LocationId=' + locationId;
    const url = '/api/reports/office/collaboratorsByOffice?Date=2023-05-17&LocationId=' + locationId;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
      })
      .catch((err) => {
        setError(err);
      });
  }, [locationId]);

  return [data, error];
}
