import '../assets/fonts/Mont-Regular.otf';
import './styles-new.css';
import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationDot, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
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
    const [data, setData] = useState(null);

    const [profiles] = useState(format_profiles(props.raw_people));
    const [originalProfiles] = useState(format_profiles(props.raw_people)); // Store the original profiles
    // state for dropdown menus
    const [locationSelect, setLocationSelect] = useState("Select location");
    const handleLocationChange = (event) => {
        setLocationSelect(event.target.value);
    }
    const [modalitySelect, setModalitySelect] = useState("Select modality");
    const handleModalityChange = (event) => {
        setModalitySelect(event.target.value);
    }

    console.log('first profile', profiles[0])

    const ProfileGrid = () => {
        const grid = [];
        const employees = [];

        const filtered = profiles.filter(p => {
            const loc = p.office === locationSelect || locationSelect === "Select location";
            const mode = p.status === modalitySelect.toLowerCase() || modalitySelect === "Select modality";

            return loc && mode;
        });

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch('/api/reports/office/collaboratorsByOffice?Date=2023-05-17&LocationId=1')
                const jsonData = await response.json();
                console.log("api response: ", response);
                setData(jsonData);
                console.log("api data: ", jsonData);
                jsonData.forEach((profile, i) => {
                    console.log('creating card for user ', i);
                    employees.push(profile);
        
                    grid.push(
                        <div key={i} className='userInfo'>
                            {/* <div className='user'></div> */}
                            <img src={profile.userProfilePictureUrl} alt="profilePic"
                                 className='userPic'></img>
                            <h3 className="userName">{profile.fullName}</h3>
                            <p className="userTitle">{profile.department}</p>
                        </div>
                    );
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                console.log('completed fetching data');
            }
        };

//        filtered.forEach((profile, i) => {
//            // console.log(profile.status, modalitySelect);

//            employees.push(profile);

//            grid.push(
//                <div key={i} className='userInfo'>
//                    {/* <div className='user'></div> */}
//                    <img src={'https://picsum.photos/100?random=' + String(parseInt(profile.id))} alt="profilePic"
//                         className='userPic'></img>
//                    <h3 className="userName">{profile.name}</h3>
//                    <p className="userTitle">{profile.role}</p>
//                    <p className={profile.status === 'remote' ? 'remoteStatus' : 'onsiteStatus'}>{profile.status.toUpperCase()}</p>
//                </div>
//            );
//        });


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
            if (profile.name.toLowerCase().split(" ").join("").substring(0, name.length) === name) {
                grid.push(
                    <div key={i} className='userInfo'>
                        {/* <div className='user'></div> */}
                        <img src={'https://picsum.photos/100?random=' + String(parseInt(profile.id))} alt="profilePic"
                             className='userPic'></img>
                        <h3 className="userName">{profile.name}</h3>
                        <p className="userTitle">{profile.role}</p>
                        <p className={profile.status === 'remote' ? 'remoteStatus' : 'onsiteStatus'}>{profile.status.toUpperCase()}</p>
                    </div>
                );
            }
        })

        // Update the grid.
        setGrid(grid);
    }

    const SearchEnter = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
      }
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
        let departments = [marketing, design, softwareEngineering, staff, dataScience, mobile];

        //console.log("d", departments)

        // Reload all profiles and reset employees if no department/s are selected.
        if (departments.every(d => d === false)) {
          departments = [true, true, true, true, true, true]
        }

        // Strings to compare department.
        const depString = ['marketing', 'design', 'softwareEngineering', 'staff', 'dataScience', 'mobile'];

        const grid = [];

        const newEmployees = [];

        // Iterate through the departments.
        departments.forEach((department, j) => {
            // Department is selected.
            if (department) {
                // Iterate through the list of employees.
                profiles.forEach((profile, i) => {
                    // Check if the profile is part of the current department.
                    if (profile.department === depString[j] || (departments.every(d => d === true) && !depString.includes(profile.department)) && !newEmployees.includes(profile)) {
                        newEmployees.push(profile);
                        grid.push(
                            <div key={i} className='userInfo'>
                                {/* <div className='user'></div> */}
                                <img src={'https://picsum.photos/100?random=' + String(parseInt(profile.id))}
                                     alt="profilePic" className='userPic'></img>
                                <h3 className="userName">{profile.name}</h3>
                                <p className="userTitle">{profile.role}</p>
                                <p className={profile.status === 'remote' ? 'remoteStatus' : 'onsiteStatus'}>{profile.status.toUpperCase()}</p>
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

    const [dropdownIsActive, setDropdownIsActive] = useState("false");
    const activeDropdown = () => {
        setDropdownIsActive(!dropdownIsActive);
    }
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                //console.log('Clicked outside');
                setDropdownIsActive(true);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const searchFocus = () => {
        var searchBar = document.getElementById('searchEmployee');
        searchBar.style.border = 'solid 2px #BDBDBD';
        document.getElementById('employyeeSearchIcon').style.color = "#23445D";
    }

    const searchUnFocus = () => {
        var searchBar = document.getElementById('searchEmployee');
        searchBar.style.border = 'solid 1px #BDBDBD';
        document.getElementById('employyeeSearchIcon').style.color = "#BDBDBD";
    }

    const [currentLocation, setCurrentLocation] = useState("");

    const handleCheckboxClick = (event, checkboxId) => {
      event.stopPropagation();
      const checkbox = document.getElementById(checkboxId);
      if (event.target.tagName.toLowerCase() !== 'input') {
        checkbox.checked = !checkbox.checked; // Toggle the checked state of the checkbox
      }
      DepartmentSelect();
    };
    
    const handleDepartmentTextClick = (event, checkboxId) => {
      const checkbox = document.getElementById(checkboxId);
      checkbox.checked = !checkbox.checked; // Toggle the checked state of the checkbox
      DepartmentSelect();
    };

    return (
        <div className='fullLayout'>
            {/* Nav */}
            <div className='navbar'>
                <h1 className='logo'><img className='logoImg' src={logo} alt='logo'></img></h1>
                <div className='navItems'>
                    <div id='poa-office' className='navItem'>
                        <FontAwesomeIcon icon={faLocationDot} size='3x'/>
                        <p>POA</p>
                    </div>
                    <div id='sp-office' className='navItem'>
                        <FontAwesomeIcon icon={faLocationDot} size='3x'/>
                        <p>SP</p>
                    </div>
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
                        {grid.length === 1 ? <p>| {grid.length} person</p> : <p>| {grid.length} people</p>}
                    </div>
                    <div className='headerFilters'>
                        <form className='searchEmployee' id='searchEmployee' onFocus={searchFocus}
                              onBlur={searchUnFocus}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} id='employyeeSearchIcon'/>
                            <input placeholder='Looking for someone?' type='search' id='search'
                                   onChange={NameSearch}
                                   onKeyDown={SearchEnter}></input>
                        </form>
                        <form onChange={DepartmentSelect}>
                            <div className='department-dropdown' ref={dropdownRef} onClick={() => setDropdownIsActive(!dropdownIsActive)}>
                                <p className='dropdown-text'>Select department(s)<i className={dropdownIsActive ? "dropdown-arrow-closed" : "dropdown-arrow-open"}></i></p>        
                                <ul className={dropdownIsActive ? "dropdownIsInactive" : "department-dropdown-list"}>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'marketing')}>
                                    <label>
                                      <input type='checkbox' name='marketing' value='marketing' id='marketing' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'marketing')}>
                                        Marketing
                                      </span>
                                    </label>
                                  </li>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'design')}>
                                    <label>
                                      <input type='checkbox' name='design' value='design' id='design' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'design')}>
                                        Design
                                      </span>
                                    </label>
                                  </li>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'softwareEngineering')}>
                                    <label>
                                      <input type='checkbox' name='softwareEngineering' value='softwareEngineering' id='softwareEngineering' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'softwareEngineering')}>
                                        Software Engineering
                                      </span>
                                    </label>
                                  </li>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'staff')}>
                                    <label>
                                      <input type='checkbox' name='staff' value='staff' id='staff' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'staff')}>
                                        Staff
                                      </span>
                                    </label>
                                  </li>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'dataScience')}>
                                    <label>
                                      <input type='checkbox' name='dataScience' value='dataScience' id='dataScience' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'dataScience')}>
                                        Data Science
                                      </span>
                                    </label>
                                  </li>
                                  <li className='department-item' onClick={(e) => handleCheckboxClick(e, 'mobile')}>
                                    <label>
                                      <input type='checkbox' name='mobile' value='mobile' id='mobile' />
                                      <span onClick={(e) => handleDepartmentTextClick(e, 'mobile')}>
                                        Mobile
                                      </span>
                                    </label>
                                  </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Grid */}
                <div className='userBox'>
                    {grid.length > 0 ? grid : <p className='emptySearchResult'>No employees found</p>}
                </div>
            </div>
        </div>
    )
}

export default Homescreen; 