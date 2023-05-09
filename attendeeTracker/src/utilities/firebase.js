import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "@firebase/auth";
import { getDatabase, onValue, ref, set, connectDatabaseEmulator } from "firebase/database";


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

// export const auth = getAuth(firebase);
// export const provider = new GoogleAuthProvider();

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
