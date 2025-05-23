import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from '../../brain_logos/brain1.png' 
import './Logo.css'


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max:55 }} style={{ height:150, width:150 }}>
            <div className="Tilt-inner pa3">
                <img style={{ paddingTop:'3px' }}  alt='logo' src={brain} />
            </div>
            </Tilt>
        </div>

    );
}
export default Logo;