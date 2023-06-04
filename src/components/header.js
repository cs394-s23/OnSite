import React from "react";
import logo from '../assets/pics/poatek-logo-full-color.png';
import '../assets/fonts/Mont-Regular.otf';
import './styles.css';

const Header = () => {
    return (
        <div>
             <div className='header'> 
                <h1><img className='logo' alt='logo' src={logo}/></h1>
                <div className='navItems'>
                    <a>Where Is Everyone?</a>
                    <a>My Profile</a>
                    <a>Log Out</a>
                </div>

            </div>
        </div>
    )
}

export default Header;