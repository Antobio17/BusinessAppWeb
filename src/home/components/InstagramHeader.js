import React from 'react';
import instagramLogo from "../../assets/images/instagram-logo-white.png";
import instagramLogoText from "../../assets/images/instagram-logo-text-white.png";

import './css/instagram-header.scss';

function InstagramHeader() {
    return (
        <div className="instagram-header">
            <img className="instagram-header-image" src={instagramLogo} alt="Instagram" width="100" height="100"/>
            <img className="instagram-header-text" src={instagramLogoText} alt="Instagram" width="250" height="100"/>
        </div>
    );
}

export default InstagramHeader;