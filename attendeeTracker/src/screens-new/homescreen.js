import React from 'react';
import '../assets/fonts/Mont-Regular.otf';
import './styles-new.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/pics/poatek-logo-square.png';

const format_profiles = raw => {
    const result = [];
    for (const [id, profile] of Object.entries(raw)) {
      profile.id = id;
      result.push(profile);
    }
    return result;
  }

const Homescreen = (props) => {
    const [profiles] = useState(format_profiles(props.raw_people));
    // state for dropdown menus
    const [locationSelect, setLocationSelect] = useState("Select location");
    const handleLocationChange = (event) => {
      setLocationSelect(event.target.value);
    }
    const [modalitySelect, setModalitySelect] = useState("Select modality");
    const handleModalityChange = (event) => {
      setModalitySelect(event.target.value);
    }
  
    const ProfileGrid = () => {
      const grid = [];
  
      const filtered = profiles.filter(p => {
        const loc = p.office === locationSelect || locationSelect === "Select location";
        const mode = p.status === modalitySelect.toLowerCase() || modalitySelect === "Select modality";
  
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
      <div className='fullLayout'>
        {/* Nav */}
        <div className='navbar'> 
            <h1 className='logo'><img className='logoImg' src={logo} alt='logo'></img></h1>
            <div className='navItems'>
                <a id='poa' className='navItem'>
                    <FontAwesomeIcon icon={faLocationDot} size='4x'/>
                    <p>POA</p>
                </a>
                <a id='sp' className='navItem'>
                    <FontAwesomeIcon icon={faLocationDot} size='4x'/>
                    <p>SP</p>
                </a>
            </div>
        </div>
  
        <div className='body'>
            <div className='headerSection'>
                <h2 className='headerGreeting'>Hi, it's good to see you</h2>
                <div className='headerMessage'>
                    <h3>It's All Hands day!</h3>
                    <p>It starts at 3pm and our happy hour will be right after!</p>
                </div>
                <div className='whosInHeading'>
                  <h2 className='whosIn'>Who's in the office today</h2>
                  <p>| 45 people</p>
                </div>
                <div className='headerFilters'>
                    {/*div className='searchEmployee'*/}
                    <form className='searchEmployee'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      {/* need to double check wtf html this should be */}
                      {/* textarea placeholder='Looking for someone?'*/}
                      <input placeholder='Looking for someone?' type='search'></input>
                    </form>
                    {/* these should probably be checkboxes eventually */}
                    <div className='filterOptions'>
                        <div id='marketing'>Marketing</div>
                        <div id='design'>Design</div>
                        <div id='softwareEngineering'>Software Engineering</div>
                        <div id='staff'>Staff</div>
                        <div id='dataScience'>Data Science</div>
                        <div id='mobile'>Mobile</div>
                    </div>
                </div>
            </div>
            {/* Grid */}
            <div className='userDisplay'> 
                <ProfileGrid profiles={profiles} />
            </div>
        </div>
      </div>
    )
}
  
export default Homescreen; 