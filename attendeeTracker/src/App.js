import './App.css';
import Homescreen from './screens-new/homescreen';
import { currentOfficeId } from './screens-new/homescreen';
import { useDbData, useApiData } from './utilities/firebase';

function App() {

  // const [people, error] = useDbData('/people');
  const [people, error] = useApiData(currentOfficeId);

  if (error) return <h1>{error}</h1>;
  // while waiting for data from firebase
  if (!people) return <h1>Loading</h1>;

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Welcome to the Attendee Tracker!</p>
      </header> */}
      <Homescreen raw_people={people} />
    </div>
  );
}

export default App;
