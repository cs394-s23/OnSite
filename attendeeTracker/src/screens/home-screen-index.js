import React from 'react';
import Header from '../components/header';
import './styles.css';

const create_row = () => {
    const row = []
    for (var i = 0; i < 6; i++)
        row.push(
        <div>
            <div className='users'>
            </div>
            <p>
            Name
            </p>
            <p className="positionText">
                Position
            </p>
        </div>)
    return row
}

const generate_grid = () => {
    const row = []
        for (var i = 0; i < 4; i++)
            row.push(
                <div className='rows'>
                {create_row()}
                </div>
            )
    return row
    }

const HomeScreen = () => {
    return (
        <div>

            <Header />
            {/* Hero Display */}
            <div className='heroDisplay'> 
                <h2>WHERE IS EVERYONE?</h2>
                <div> 
                    <select className='locationDropdown' name="location" id="location">
                        <option value="PORTO ALEGRE">PORTO ALEGRE</option>
                        <option value="SAO PAULO">SAO PAULO</option>
                        <option value="MIAMI">MIAMI</option>
                        <option value="LISBON">LISBON</option>
                    </select>
                    <select className='modalityDropdown' name="modality" id="modality">
                        <option value="On-Site">On-Site</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>
            </div>
            {/* Grid */}
            <div className='userDisplay'> 
                {generate_grid()}
            </div>
            
            
            
        </div>
    )
}

export default HomeScreen; 