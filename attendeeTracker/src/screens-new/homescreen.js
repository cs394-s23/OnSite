import "../assets/fonts/Mont-Regular.otf";
import "./styles-new.css";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/pics/poatek-logo-square.png";

const Homescreen = (props) => {
  // all profiles (immutable)
  const [profiles] = useState(props.raw_people);
  console.log(profiles);
  // currently displayed profiles
  const [currentProfiles, setCurrentProfiles] = useState(props.raw_people);

  const RenderProfile = (profile, i) => {
    return (
      <div key={i} className="userInfo">
        <img
          src={profile.userProfilePictureUrl}
          alt="profilePic"
          className="userPic"
        ></img>
        <h3 className="userName">{profile.fullName}</h3>
        <p className="userTitle">{profile.department}</p>
        {/* <p className={profile.status === 'remote' ? 'remoteStatus' : 'onsiteStatus'}>{profile.status.toUpperCase()}</p> */}
      </div>
    );
  };

  const ProfileGrid = () => {
    if (currentProfiles.length > 0) {
      return currentProfiles.map(RenderProfile);
    } else {
      return <p className="emptySearchResult">No employees found</p>;
    }
  };

  // Set initial grid to all employees.
  const [grid, setGrid] = useState(ProfileGrid());

  // Current profile data.
  const [employees, setEmployees] = useState(profiles);

  const NameSearch = () => {
    // Retrieve search box element.
    // Search box is not empty (lowercase & remove spaces).
    const name = document.getElementById("search").value.toLowerCase();

    const filtered = profiles.filter((p) =>
      p.fullName.toLowerCase().startsWith(name)
    );
    setCurrentProfiles(filtered);
  };

  const SearchEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const DepartmentSelect = () => {
    // Store whether a department has been selected.
    const marketing = document.getElementById("marketing").checked;
    const design = document.getElementById("design").checked;
    const softwareEngineering = document.getElementById(
      "softwareEngineering"
    ).checked;
    const staff = document.getElementById("staff").checked;
    const dataScience = document.getElementById("dataScience").checked;
    const mobile = document.getElementById("mobile").checked;

    // Store all checklist bools.
    let departments = [
      marketing,
      design,
      softwareEngineering,
      staff,
      dataScience,
      mobile,
    ];

    //console.log("d", departments)

    // Reload all profiles and reset employees if no department/s are selected.
    if (departments.every((d) => d === false)) {
      departments = [true, true, true, true, true, true];
    }

    // Strings to compare department.
    const depString = [
      "marketing",
      "design",
      "softwareEngineering",
      "staff",
      "dataScience",
      "mobile",
    ];

    const grid = [];

    const newEmployees = [];

    // Iterate through the departments.
    departments.forEach((department, j) => {
      // Department is selected.
      if (department) {
        // Iterate through the list of employees.
        profiles.forEach((profile, i) => {
          // Check if the profile is part of the current department.
          if (
            profile.department === depString[j] ||
            (departments.every((d) => d === true) &&
              !depString.includes(profile.department) &&
              !newEmployees.includes(profile))
          ) {
            newEmployees.push(profile);
            // grid.push(
            //     <div key={i} className='userInfo'>
            //         {/* <div className='user'></div> */}
            //         <img src={'https://picsum.photos/100?random=' + String(parseInt(profile.id))}
            //              alt="profilePic" className='userPic'></img>
            //         <h3 className="userName">{profile.name}</h3>
            //         <p className="userTitle">{profile.role}</p>
            //         <p className={profile.status === 'remote' ? 'remoteStatus' : 'onsiteStatus'}>{profile.status.toUpperCase()}</p>
            //     </div>
            // );
          }
        });
      }
    });

    // Update the grid and employees.
    // setGrid(grid);
    setCurrentProfiles(newEmployees);
    // setEmployees(newEmployees);
  };

  const [dropdownIsActive, setDropdownIsActive] = useState("false");
  const activeDropdown = () => {
    setDropdownIsActive(!dropdownIsActive);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //console.log('Clicked outside');
        setDropdownIsActive(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchFocus = () => {
    var searchBar = document.getElementById("searchEmployee");
    searchBar.style.border = "solid 2px #BDBDBD";
    document.getElementById("employyeeSearchIcon").style.color = "#23445D";
  };

  const searchUnFocus = () => {
    var searchBar = document.getElementById("searchEmployee");
    searchBar.style.border = "solid 1px #BDBDBD";
    document.getElementById("employyeeSearchIcon").style.color = "#BDBDBD";
  };

  const handleCheckboxClick = (event, checkboxId) => {
    event.stopPropagation();
    const checkbox = document.getElementById(checkboxId);
    if (event.target.tagName.toLowerCase() !== "input") {
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
    <div className="fullLayout">
      {/* Nav */}
      <div className="navbar">
        <h1 className="logo">
          <img className="logoImg" src={logo} alt="logo"></img>
        </h1>
        <div className="navItems">
          <div id="poa-office" className="navItem">
            <FontAwesomeIcon icon={faLocationDot} size="3x" />
            <p>POA</p>
          </div>
          <div id="sp-office" className="navItem">
            <FontAwesomeIcon icon={faLocationDot} size="3x" />
            <p>SP</p>
          </div>
        </div>
      </div>

      <div className="body">
        <div className="headerSection">
          <h2 className="headerGreeting">Hi, it's good to see you</h2>
          <div className="headerMessage">
            <h3>It's All Hands day!</h3>
            <p>It starts at 3pm and our happy hour will be right after!</p>
          </div>
          <div className="whosInHeading">
            <h2 className="whosIn">Who's in the office today</h2>
            {grid.length === 1 ? (
              <p>| {grid.length} person</p>
            ) : (
              <p>| {grid.length} people</p>
            )}
          </div>
          <div className="headerFilters">
            <form
              className="searchEmployee"
              id="searchEmployee"
              onFocus={searchFocus}
              onBlur={searchUnFocus}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                id="employyeeSearchIcon"
              />
              <input
                placeholder="Looking for someone?"
                type="search"
                id="search"
                onChange={NameSearch}
                onKeyDown={SearchEnter}
              ></input>
            </form>
            <form onChange={DepartmentSelect}>
              <div
                className="department-dropdown"
                ref={dropdownRef}
                onClick={() => setDropdownIsActive(!dropdownIsActive)}
              >
                <p className="dropdown-text">
                  Select department(s)
                  <i
                    className={
                      dropdownIsActive
                        ? "dropdown-arrow-closed"
                        : "dropdown-arrow-open"
                    }
                  ></i>
                </p>
                <ul
                  className={
                    dropdownIsActive
                      ? "dropdownIsInactive"
                      : "department-dropdown-list"
                  }
                >
                  <li
                    className="department-item"
                    onClick={(e) => handleCheckboxClick(e, "marketing")}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="marketing"
                        value="marketing"
                        id="marketing"
                      />
                      <span
                        onClick={(e) =>
                          handleDepartmentTextClick(e, "marketing")
                        }
                      >
                        Marketing
                      </span>
                    </label>
                  </li>
                  <li
                    className="department-item"
                    onClick={(e) => handleCheckboxClick(e, "design")}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="design"
                        value="design"
                        id="design"
                      />
                      <span
                        onClick={(e) => handleDepartmentTextClick(e, "design")}
                      >
                        Design
                      </span>
                    </label>
                  </li>
                  <li
                    className="department-item"
                    onClick={(e) =>
                      handleCheckboxClick(e, "softwareEngineering")
                    }
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="softwareEngineering"
                        value="softwareEngineering"
                        id="softwareEngineering"
                      />
                      <span
                        onClick={(e) =>
                          handleDepartmentTextClick(e, "softwareEngineering")
                        }
                      >
                        Software Engineering
                      </span>
                    </label>
                  </li>
                  <li
                    className="department-item"
                    onClick={(e) => handleCheckboxClick(e, "staff")}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="staff"
                        value="staff"
                        id="staff"
                      />
                      <span
                        onClick={(e) => handleDepartmentTextClick(e, "staff")}
                      >
                        Staff
                      </span>
                    </label>
                  </li>
                  <li
                    className="department-item"
                    onClick={(e) => handleCheckboxClick(e, "dataScience")}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="dataScience"
                        value="dataScience"
                        id="dataScience"
                      />
                      <span
                        onClick={(e) =>
                          handleDepartmentTextClick(e, "dataScience")
                        }
                      >
                        Data Science
                      </span>
                    </label>
                  </li>
                  <li
                    className="department-item"
                    onClick={(e) => handleCheckboxClick(e, "mobile")}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="mobile"
                        value="mobile"
                        id="mobile"
                      />
                      <span
                        onClick={(e) => handleDepartmentTextClick(e, "mobile")}
                      >
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
        <div className="userBox">
          <ProfileGrid />
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
