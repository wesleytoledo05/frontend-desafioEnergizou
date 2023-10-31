import React from 'react';
import LogoEnergizou from "../../assets/logo-energizou.png"

import './styles.css';

function Header() {
    return (
        <div className='containerLogo'>
            <div id='logo'>
                <img src={LogoEnergizou} alt='' />
            </div>
        </div>
    );
}
export default Header;