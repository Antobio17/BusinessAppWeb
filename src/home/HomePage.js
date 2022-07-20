import {pageTransition, pageVariants, webServiceURL, businessName} from "../App";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import './css/home.scss';

import Loading from '../common/components/Loading';
import InstagramHeader from './components/InstagramHeader';
import InstagramImageBox from './components/InstagramImageBox';
import ServiceBox from './components/ServiceBox';

import ShoppingCart from '../assets/images/shopping-cart.png';
import {Link} from "react-router-dom";

function HomePage() {
    const [loading, setLoading] = useState(true);
    const [presentationData, setPresentationData] = useState(undefined);
    const [servicesData, setServicesData] = useState(undefined);
    const [images, setImages] = useState(undefined);
    const [contactData, setContactData] = useState(undefined);

    async function getHomeData() {
        await axios.post(
            webServiceURL + '/api/business/get/data/home',
            {params: {}}
        ).then(response => {
            const data = response.data.data;
            setPresentationData('presentation' in data ? data.presentation : undefined);
            setServicesData('services' in data ? data.services : undefined);
            setImages('images' in data ? data.images : undefined);
            setContactData('contact' in data ? data.contact : undefined);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (
            presentationData === undefined
            || servicesData === undefined
            || images === undefined
            || contactData === undefined
        ) {
            getHomeData().then().catch(error => {
                console.log('Error al recuperar los artículos: ' + error);
            });
        }
    }, []);

    // noinspection JSUnresolvedVariable
    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main home">
                {loading ?
                    (
                        <Loading/>
                    )
                    : (
                        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                    transition={pageTransition}>
                            <section className="row section-presentation">
                                <div className="col-12 col-md-4 col-lg-3 text-center">
                                    <img
                                        src={webServiceURL + '/images/' + presentationData.image}
                                        alt={presentationData.bossName} width="300" height="300"
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-9 mt-5  mt-md-auto presentation-container">
                                    <span className="title">¿Quién es {presentationData.bossName}?</span>
                                    <p className="presentation">
                                        {presentationData.text}
                                    </p>
                                </div>
                            </section>
                            <section className="section-images">
                                <div className="row">
                                    <InstagramHeader/>
                                </div>
                                <div className="images-container row">
                                    {
                                        Object.keys(images).map((key) => (
                                            <InstagramImageBox
                                                src={webServiceURL + '/images/' + images[key]}
                                                alt="Imagen Instagram"
                                                width="300" height="300"
                                            />
                                        ))
                                    }
                                </div>
                            </section>
                            <section className="section-business-services">
                                <div className="services-title">
                                    <span>¿Qué ofrecemos?</span>
                                </div>
                                <div className="services-container row">
                                    {
                                        Object.keys(servicesData).map((key) => (
                                            <ServiceBox
                                                imageSrc={webServiceURL + '/images/' + servicesData[key].imageSrc}
                                                alt="Servicio"
                                                width="60"
                                                height="60"
                                                title={servicesData[key].title}
                                                description={servicesData[key].description}
                                            />
                                        ))
                                    }
                                </div>
                            </section>
                            <section className="section-business-contact">
                                <div className="contact-title">
                                    <span>Contacta con {contactData.businessName}</span>
                                </div>
                                <div className="contact-container">
                                    <span><strong>Dirección:</strong> {contactData.address}</span>
                                    <span><strong>Horario:</strong> {contactData.opens} a {contactData.closes}</span>
                                    {'email' in contactData &&
                                    <span><strong>Email:</strong> {contactData.email}</span>
                                    }
                                    {'phoneNumber' in contactData &&
                                    <span><strong>Teléfono:</strong> {contactData.phoneNumber}</span>
                                    }
                                </div>
                            </section>
                            <section className="row section-store-info">
                                <div className="col-12 col-lg-4 text-center store-info-img">
                                    <img src={ShoppingCart} alt="Carrito de compra" width="300" height="300"/>
                                </div>
                                <div className="col-12 col-lg-8 store-info-container">
                                    <div className="store-info-title">
                                        <span>No esperes más... ¡Disfruta de los mejores productos!</span>
                                    </div>
                                    <div className="store-info-description">
                                        <p>
                                            Desde <strong>{businessName}</strong> te ofrecemos un gran catálogo de
                                            productos de calidad indiscutible. Puedes consultar nuestro stock aquí
                                            en nuestra Web, y si lo deseas... ¡No dudes en iniciar sesión y realizar
                                            tus pedidos!
                                        </p>
                                        <Link to="/tienda" className="store-info-link">
                                            Ir a la tienda <ArrowForwardIcon/>
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}
            </main>
        </motion.div>
    );
}

export default HomePage;