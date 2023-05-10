import React from 'react';
import '../assets/fonts/Mont-Regular.otf';
import './styles.css';
import Header from '../components/header';
import { useState } from 'react';


const format_profiles = raw => {
  const result = [];
  for (const [id, profile] of Object.entries(raw)) {
    profile.id = id;
    result.push(profile);
  }
  return result;
}

const HomeScreen = (props) => {
  const [profiles] = useState(format_profiles(props.raw_people));
  // state for dropdown menus
  const [locationSelect, setLocationSelect] = useState("Porto Alegre");
  const handleLocationChange = (event) => {
    setLocationSelect(event.target.value);
  }
  const [modalitySelect, setModalitySelect] = useState("On-Site");
  const handleModalityChange = (event) => {
    setModalitySelect(event.target.value);
  }

  const ProfileGrid = () => {
    const grid = [];

    const filtered = profiles.filter(p => {
      const loc = p.office === locationSelect;
      const mode = p.status === modalitySelect.toLowerCase();

      return loc && mode;
    });
  
    filtered.forEach((profile, i) => {
      // console.log(profile.status, modalitySelect);

      grid.push(
        <div key={i} className='userCard'>
          {/* <div className='user'></div> */}
          <img src={'https://picsum.photos/100?random='+ String(parseInt(profile.id))} alt="profilePic" className='profilePic'></img>
          <h3 className="nameText">{profile.name}</h3>
          <p className="positionText">{profile.role}</p>
        </div>
      );
    });
  
    return grid;
  }

  return (
    <div>

      <Header />
      {/* Hero Display */}
      <div className='heroDisplay'> 
        <h2 className='whereIsEveryoneText'>Where is everyone?</h2>
        <div className='select'> 
          <div className='location'>
            <select className='locationDropdown' name="location" id="location" 
              value={locationSelect} onChange={handleLocationChange}>
              <option value="Select location" disabled>Select location</option>
              <option value="Porto Alegre">Porto Alegre</option>
              <option value="Sao Paulo">Sao Paulo</option>
              <option value="Miami">Miami</option>
              <option value="Lisbon">Lisbon</option>
            </select>
          </div>
          <div className='modality'>
            <select className='modalityDropdown' name="modality" id="modality"
              value={modalitySelect} onChange={handleModalityChange}>
              <option value="Select modality" disabled>Select modality</option>
              <option value="On-Site">On-Site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className='userDisplay'> 
        <ProfileGrid profiles={profiles} />
      </div>
    </div>
  )
}

export default HomeScreen; 