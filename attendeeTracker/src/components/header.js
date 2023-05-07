import React from "react";
import logo from '../assets/pics/poatek-logo-full-color.png';
import './styles.css';

const Header = () => {
    return (
        <div>
             <div className='header'> 
                <img className='logo' alt='logo' src={logo}/>
                <div className='navItems'>
                    <p>Where Is Everyone?</p>
                    <p>My Profile</p>
                    <p>Log Out</p>
                </div>

            </div>
        </div>
    )
}

export default Header;