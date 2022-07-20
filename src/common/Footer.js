import React from 'react';
import {businessName} from "../App";
import {SocialIcon} from 'react-social-icons';

import './css/footer.css';

function Footer() {
    const address = process.env.REACT_APP_CONFIG_WEBSITE_FOOTER_ADDRESS;
    const phoneNumber = process.env.REACT_APP_CONFIG_WEBSITE_FOOTER_PHONE_NUMBER;

    return (
        <footer className="footer row align-items-center">
            {businessName !== undefined && address !== undefined && phoneNumber !== undefined &&
            <section className="col-12 col-lg-4 text-center text-lg-start section-business-info">
                <p className="business-name">{businessName}</p>
                <p>{address}</p>
                <p>{phoneNumber}</p>
            </section>
            }
            <section
                className="col-12 col-md-6 col-lg-4 text-center text-md-start text-lg-center section-developing-info"
            >
                <p>Web desarrollada por <strong>Antonio Jiménez</strong></p>
                <div
                    className="row justify-content-between align-content-center m-auto m-md-0 m-lg-auto social-networks"
                >
                    <SocialIcon url="https://github.com/Antobio17" bgColor="white"/>
                    <SocialIcon url="https://t.me/antobio17" network="telegram"/>
                    <SocialIcon url="https://www.linkedin.com/in/antonio-jim%C3%A9nez-rodr%C3%ADguez-098aa8205/"/>
                </div>
            </section>
            <section className="col-12 col-md-6 col-lg-4 text-center text-md-end section-message">
                <p>GRACIAS</p>
                <p>POR SU VISITA</p>
                <p>¡HASTA PRONTO!</p>
            </section>
        </footer>
    );
}

export default Footer;