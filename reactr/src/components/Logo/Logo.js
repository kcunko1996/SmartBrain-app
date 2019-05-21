import React from 'react';
import Tilt from 'react-tilt';
import brain   from './brain.jpg';
import './Logo.css';
const Logo = () => {
    return(
        <div className='mt0 ma4'>   
            <Tilt className="Tilt shadow-2 " options={{ max : 55 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa3"> <img style={{paddingTop: '10px', width:'500px'}}alt='logo' src={brain}></img> </div>
            </Tilt>
        </div>
    );
}

export default Logo;