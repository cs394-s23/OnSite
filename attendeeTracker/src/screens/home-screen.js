import React from 'react';
import '../assets/fonts/Mont-Regular.otf';
import './styles.css';
import Header from '../components/header';
import { useState } from 'react';

const ProfileRow = () => {
  const row = []
  for (var i = 0; i < 6; i++)
    row.push(
    <div>
      <div className='user'></div>
      <h3 className="nameText">Name</h3>
      <p className="positionText">Position</p>
    </div>)
  return row
}

const ProfileGrid = () => {
  const row = []
    for (var i = 0; i < 4; i++)
      row.push(
        <div className='userRow'>
          <ProfileRow />
        </div>
      )
  return row;
}

const format_profiles = raw => {
  const result = [];
  for (const [id, profile] of Object.entries(raw)) {
    result.push(profile);
  }
  return result;
}

const HomeScreen = (props) => {
  const [profiles] = useState(format_profiles(props.raw_people));
  console.log(profiles);

  return (
    <div>

      <Header />
      {/* Hero Display */}
      <div className='heroDisplay'> 
        <h2 className='whereIsEveryoneText'>Where is everyone?</h2>
        <div class='select'> 
          <div class='location'>
            <select className='locationDropdown' name="location" id="location">
              <option value="Select location" disabled>Select location</option>
              <option value="Porto Alegre">Porto Alegre</option>
              <option value="Sao Paulo">Sao Paulo</option>
              <option value="Miami">Miami</option>
              <option value="Lisbon">Lisbon</option>
            </select>
          </div>
          <div class='modality'>
            <select className='modalityDropdown' name="modality" id="modality">
              <option value="Select modality" disabled>Select modality</option>
              <option value="On-Site">On-Site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className='userDisplay'> 
        <ProfileGrid />
      </div>
      
      
      
    </div>
  )
}

export default HomeScreen; 