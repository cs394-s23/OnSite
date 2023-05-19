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
      const employees = [];
  
      const filtered = profiles.filter(p => {
        const loc = p.office === locationSelect || locationSelect === "Select location";
        const mode = p.status === modalitySelect.toLowerCase() || modalitySelect === "Select modality";
  
        return loc && mode;
      });
    
      filtered.forEach((profile, i) => {
        // console.log(profile.status, modalitySelect);

        employees.push(profile);
  
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

    // Set initial grid to all employees.
    const [grid, setGrid] = useState(ProfileGrid());

    // Current profile data.
    const [employees, setEmployees] = useState(profiles);

    const NameSearch = () => {

      const grid = [];
      
      // Retrieve search box element.
      let name = document.getElementById('search');

      // Search box is not empty (lowercase & remove spaces). 
      name = name.value.toLowerCase().split(" ").join("");


      // Iterate through profiles to find matching name. 
      employees.forEach((profile, i) => {
        if (profile.name.toLowerCase().split(" ").join("").substring(0,name.length) === name) {
          grid.push(
            <div key={i} className='userCard'>
              {/* <div className='user'></div> */}
              <img src={'https://picsum.photos/100?random='+ String(parseInt(profile.id))} alt="profilePic" className='profilePic'></img>
              <h3 className="nameText">{profile.name}</h3>
              <p className="positionText">{profile.role}</p>
            </div>
          );
        }
      })

      // Update the grid and employees.
      setGrid(grid);
    }

    const DepartmentSelect = () => {
      
      // Store whether a department has been selected.
      const marketing = document.getElementById('marketing').checked;
      const design = document.getElementById('design').checked;
      const softwareEngineering = document.getElementById('softwareEngineering').checked;
      const staff = document.getElementById('staff').checked;
      const dataScience = document.getElementById('dataScience').checked;
      const mobile = document.getElementById('mobile').checked;

      // Store all checklist bools. 
      const departments = [marketing, design, softwareEngineering, staff, dataScience, mobile];

      // Reload all profiles and reset to employees if no departments are selected.
      if (departments.every(d =>d === false)){
        setGrid(ProfileGrid());
        setEmployees(profiles);
        return;
      }


      // Strings to compare department. 
      const depString = ['marketing', 'design', 'softwareEngineering','staff', 'dataScience', 'mobile'];

      const grid = [];

      const newEmployees = [];

      // Iterate through the departments.
      departments.forEach((department, j) => {
        // Department is selected. 
        if (department){
          // Iterate through the current list of employee. 
          profiles.forEach((profile, i) => {
            // Check if the profile is part of the current department. 
            if (profile.department === depString[j]){
              newEmployees.push(profile);
              grid.push(
                <div key={i} className='userCard'>
                  {/* <div className='user'></div> */}
                  <img src={'https://picsum.photos/100?random='+ String(parseInt(profile.id))} alt="profilePic" className='profilePic'></img>
                  <h3 className="nameText">{profile.name}</h3>
                  <p className="positionText">{profile.role}</p>
              </div>
              );
            } 
          });
        }
      });
     
      // Update the grid and employees.
      setGrid(grid);
      setEmployees(newEmployees);
    }

    const activeDropdown = (event) => {
      event.currentTarget.toggleClass('is-active');
      console.log('active dropdown call');
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
                  {grid.length === 1 ? <p>| {grid.length} person</p>: <p>| {grid.length} people</p>}
                </div>
                <div className='headerFilters'>
                    <form className='searchEmployee'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      <input placeholder='Looking for someone?' type='search' id='search' onChange={NameSearch}></input>
                    </form>

                    {/* please delete this when no longer needed - Jesus */}
                    {/* these should probably be checkboxes eventually */}
                    {/* <div className='filterOptions'>
                        <div id='marketing' onClick={DepartmentSelect}>Marketing</div>
                        <div id='design'>Design</div>
                        <div id='softwareEngineering'>Software Engineering</div>
                        <div id='staff'>Staff</div>
                        <div id='dataScience'>Data Science</div>
                        <div id='mobile'>Mobile</div>
                    </div> */}
                    
                    <form onChange={DepartmentSelect}>
                      <div className='department-dropdown'>
                        <p className='dropdown-text' onClick={(e) => activeDropdown(e)}>Select department(s)<i className='dropdown-arrow'></i></p>
                        <ul className='department-dropdown-list'>
                          <li className='department-item'><label><input type='checkbox' name='marketing' value='marketing' id='marketing'/>Marketing</label></li>
                          <li className='department-item'><label><input type='checkbox' name='design' value='design' id='design'/>Design</label></li>
                          <li className='department-item'><label><input type='checkbox' name='softwareEngineering' value='softwareEngineering' id='softwareEngineering'/>Software Engineering</label></li>
                          <li className='department-item'><label><input type='checkbox' name='staff' value='staff' id='staff'/>Staff</label></li>
                          <li className='department-item'><label><input type='checkbox' name='dataScience' value='dataScience' id='dataScience'/>Data Science</label></li>
                          <li className='department-item'><label><input type='checkbox' name='mobile' value='mobile' id='mobile'/>Mobile</label></li>
                        </ul>
                      </div>
                    </form>
                </div>
            </div>
            {/* Grid */}
            <div className='userDisplay'> 
                {/* <ProfileGrid profiles={profiles} /> */}
                {grid.length > 0 ? grid : <p>No employee/s found</p>}
            </div>
        </div>
      </div>
    )
}
  
export default Homescreen; 