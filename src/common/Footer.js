import React, {useState, useEffect} from 'react';
import {webServiceURL} from "../App";
import axios from "axios";
import './css/footer.css';
import { SocialIcon } from 'react-social-icons';


function Footer() {
    const [businessName, setBusinessName] = useState(process.env.REACT_APP_CONFIG_WEBSITE_FOOTER_BUSINESS_NAME);
    const [address, setAddress] = useState(process.env.REACT_APP_CONFIG_WEBSITE_FOOTER_ADDRESS);
    const [phoneNumber, setPhoneNumber] = useState(process.env.REACT_APP_CONFIG_WEBSITE_FOOTER_PHONE_NUMBER);

    async function getFooterData() {
        await axios.post(
            webServiceURL + '/api/business/get/data/footer',
            {params: {}}
        ).then(response => {
            const data = response.data.data;
        });
    }

    useEffect(() => {

    }, []);

    return (
        <footer className="footer row align-items-center">
            { businessName !== undefined && address !== undefined && phoneNumber !== undefined &&
            <section className="col-12 col-lg-4 text-center text-lg-start section-business-info">
                <p className="business-name">{ businessName }</p>
                <p>{ address }</p>
                <p>{ phoneNumber }</p>
            </section>
            }
            <section
                className="col-12 col-md-6 col-lg-4 text-center text-md-start text-lg-center section-developing-info"
            >
                <p>Web desarrollada por <strong>Antonio Jiménez</strong></p>
                <div
                    className="row justify-content-between align-content-center m-auto m-md-0 m-lg-auto social-networks"
                >
                    <SocialIcon url="https://www.instagram.com/antobio17/?hl=es" />
                    <SocialIcon url="https://github.com/Antobio17" bgColor="white"/>
                    <SocialIcon url="https://www.linkedin.com/in/antonio-jim%C3%A9nez-rodr%C3%ADguez-098aa8205/" />
                    <SocialIcon url="https://t,me/antobio17" network="telegram" />
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