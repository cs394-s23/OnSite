import "../assets/fonts/Mont-Regular.otf";
import "./styles-new.css";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/pics/poatek-logo-square.png";

const departmentNames = [
  "SW Development",
  "Mobile Development",
  "Marketing",
  "Human Resources",
];

const officeLocations = [
  "Porto Alegre -BR",
  "São Paulo -BR"
];

export var currentOfficeId = 1;

const Homescreen = (props) => {
  // all profiles (immutable)
  const [profiles] = useState(props.raw_people);
  //console.log("all profiles:", profiles);
  // currently displayed profiles
  const [currentProfiles, setCurrentProfiles] = useState(props.raw_people[currentOfficeId]);

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

  const SearchEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const SearchAll = () => {
    // Retrieve search box element, make lower case and remove spaces
    const name = document.getElementById("search").value.toLowerCase().replace(" ", "");
    // filter for profiles with name that starts with search term
    const filtered1 = profiles.filter((p) => p.fullName.toLowerCase().startsWith(name));
    setCurrentProfiles(filtered1);

    // array of which department checkboxes are selected
    const selected = departmentNames.map(d => {
      return document.getElementById(d).checked;
    });

    // if no departments are selected, display everything
    if (selected.every(d => !d)) {
      selected.fill(true);
    }

    const filtered2 = [];

    departmentNames.filter((dep, i) => selected[i]).forEach((dep, i) => {
      // profiles matching given department
      const matching = profiles.filter(p => p.department === dep);
      filtered2.push(...matching);
    });

    const filtered = filtered1.filter(value => filtered2.includes(value));

    setCurrentProfiles(filtered);
  }

  const NameSearch = () => {
    // Retrieve search box element, make lower case and remove spaces
    const name = document.getElementById("search").value.toLowerCase().replace(" ", "");
    // filter for profiles with name that starts with search term
    const filtered = profiles.filter((p) => p.fullName.toLowerCase().startsWith(name));
    setCurrentProfiles(filtered);
  };

  const DepartmentSelect = () => {
    // array of which department checkboxes are selected
    const selected = departmentNames.map(d => {
      return document.getElementById(d).checked;
    });

    // if no departments are selected, display everything
    if (selected.every(d => !d)) {
      selected.fill(true);
    }

    const filtered = [];
    departmentNames.filter((dep, i) => selected[i]).forEach((dep, i) => {
      // profiles matching given department
      const matching = profiles.filter(p => p.department === dep);
      filtered.push(...matching);
    });

    setCurrentProfiles(filtered);
  };

  const [dropdownIsActive, setDropdownIsActive] = useState("false");
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
    SearchAll();
  };

  const handleDepartmentTextClick = (event, checkboxId) => {
    const checkbox = document.getElementById(checkboxId.dep);
    checkbox.checked = !checkbox.checked; // Toggle the checked state of the checkbox
    SearchAll();
  };

  const locationNumber = (event) => {
    currentOfficeId = +event.currentTarget.id.substring(0, 1);
    //console.log(typeof currentOfficeId);
    //return currentOfficeId;
  }

  return (
    <div className="fullLayout">
      {/* Nav */}
      <div className="navbar">
        <h1 className="logo">
          <img className="logoImg" src={logo} alt="logo"></img>
        </h1>
        <div className="navItems">
          <div id="0-poa-office" className="navItem" onClick={(event) => locationNumber(event)}>
            <FontAwesomeIcon icon={faLocationDot} size="3x"/>
            <p>POA</p>
          </div>
          <div id="1-sp-office" className="navItem" onClick={(event) => locationNumber(event)}>
            <FontAwesomeIcon icon={faLocationDot} size="3x"/>
            <p>SP</p>
          </div>
          <div id="2-miami-office" className="navItem" onClick={(event) => locationNumber(event)}>
            <FontAwesomeIcon icon={faLocationDot} size="3x"/>
            <p>POA</p>
          </div>
          <div id="3-lisbon-office" className="navItem" onClick={(event) => locationNumber(event)}>
            <FontAwesomeIcon icon={faLocationDot} size="3x"/>
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
            <p>| {currentProfiles.length} {currentProfiles.length === 1 ? "person" : "people"}</p>
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
                onChange={SearchAll}
                onKeyDown={SearchEnter}
              ></input>
            </form>
            <form onChange={SearchAll}>
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
                  {departmentNames.map((dep) => {
                    return (
                    <li 
                      className="department-item"
                      onClick={(e) => handleCheckboxClick(e, dep)}
                    >
                      <label>
                      <input type="checkbox" name={dep} value={dep} id={dep}/>
                      <span onClick={(e) => handleDepartmentTextClick(e, {dep})}>
                        {dep}
                      </span>
                    </label>
                    </li>)
                  })}
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

