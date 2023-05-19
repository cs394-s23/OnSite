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
    
      return {grid, employees};
    }

    // Set initial grid to all employees.
    const [grid, setGrid] = useState(ProfileGrid().grid);

    // Actual profile data.
    const [employees, setEmployees] = useState(ProfileGrid().employees);

    // Whether a at least one department has been selected.
    const [departmentSelected, setDepartmentSelected] = useState(false);

    const [searchBoxEmpty, setSearchBoxEmpty] = useState(true);

    const NameSearch = () => {

      const grid = [];
      const newEmployees = [];
      
      // Retrieve search box element.
      let name = document.getElementById('search');

      // Search box is empty. 
      if (name === null){
        setSearchBoxEmpty(true);
        setGrid(ProfileGrid().grid);
        setEmployees(ProfileGrid().employees);
        return;
      }
      // Search box is not empty (lowercase & remove spaces). 
      name = name.value.toLowerCase().split(" ").join("");

      // Iterate through profiles to find matching name. 
      profiles.forEach((profile, i) => {
        if (profile.name.toLowerCase().split(" ").join("").substring(0,name.length) === name) {
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
      })

      // Update the grid and employees.
      setSearchBoxEmpty(false); 
      setGrid(grid);
      console.log('newEmployees', newEmployees);
      setEmployees(newEmployees);

      // Update the grid if at least one department is selected.
      // if (departmentSelected){
      //     DepartmentSelect();
      // }
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

      // Reload all profiles if no departments are selected.
      if (departments.every(d =>d === false)){
        setDepartmentSelected(false);
        setGrid(ProfileGrid().grid);
        setEmployees(ProfileGrid().employees);
        return;
      }

      // At least one department selected and search box empty. 

      // Strings to compare department. 
      const depString = ['marketing', 'design', 'softwareEngineering','staff', 'dataScience', 'mobile'];

      const grid = [];

      // Iterate through the departments.
      departments.forEach((department, j) => {
        // Department is selected. 
        if (department){
          // Iterate through the current list of employee. 
          profiles.forEach((profile, i) => {
            // Check if the profile is part of the current department. 
            if (profile.department === depString[j]){
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
     
      // Update the grid.
      setDepartmentSelected(true);
      setGrid(grid);
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
                  <p>| {grid.length} people</p>
                </div>
                <div className='headerFilters'>
                    <form className='searchEmployee'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      <input placeholder='Looking for someone?' type='search' id='search' onChange={NameSearch}></input>
                    </form>
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
                      <label><input type='checkbox' name='marketing' value='marketing' id='marketing'/>Marketing</label>
                      <label><input type='checkbox' name='design' value='design' id='design'/>Design</label>
                      <label><input type='checkbox' name='softwareEngineering' value='softwareEngineering' id='softwareEngineering'/>Software Engineering</label>
                      <label><input type='checkbox' name='staff' value='staff' id='staff'/>Staff</label>
                      <label><input type='checkbox' name='dataScience' value='dataScience' id='dataScience'/>Data Science</label>
                      <label><input type='checkbox' name='mobile' value='mobile' id='mobile'/>Mobile</label>
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