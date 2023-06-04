import './App.css';
import Homescreen from './screens-new/homescreen';
import { useDbData, useApiData } from './utilities/firebase';

function App() {

  // const [people, error] = useDbData('/people');
  const [people, error] = useApiData(1);
  const [people2, error2] = useApiData(2);
  const [people3, error3] = useApiData(3);
  const [people4, error4] = useApiData(4);

  if (error || error2 || error3 || error4) return <h1>{error}</h1>;
  // while waiting for data from firebase
  if (!people || !people2 || !people3 || !people4) return <h1>Loading</h1>;

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Welcome to the Attendee Tracker!</p>
      </header> */}
      <Homescreen raw_people={[people, people2, people3, people4]} />
    </div>
  );
}

export default App;
