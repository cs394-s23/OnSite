import './App.css';
import HomeScreen from './screens/home-screen';
import { useDbData } from './utilities/firebase';

function App() {

  const [people, error] = useDbData('/people');

  if (error) return <h1>{error}</h1>;
  // while waiting for data from firebase
  if (!people) return <h1>Loading</h1>;

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Welcome to the Attendee Tracker!</p>
      </header> */}
      <HomeScreen raw_people={people} />
    </div>
  );
}

export default App;
