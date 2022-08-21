import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from "react-router-dom";

import './css/home.scss';

import Loading from '../common/components/Loading';
import InstagramHeader from './components/InstagramHeader';
import InstagramImageBox from './components/InstagramImageBox';
import ServiceBox from './components/ServiceBox';

import {pageTransition, pageVariants, webServiceURL, businessName} from "../App";
import ShoppingCart from '../assets/images/shopping-cart.png';
import {getHomeData} from "../services/home";
import {formatDay} from "../services/tools";

function HomePage() {
    const [loading, setLoading] = useState(true);
    const [introData, setIntroData] = useState(undefined);
    const [servicesData, setServicesData] = useState(undefined);
    const [socialData, setSocialData] = useState(undefined);
    const [contactData, setContactData] = useState(undefined);

    useEffect(() => {
        if (
            introData === undefined
            || servicesData === undefined
            || socialData === undefined
            || contactData === undefined
        ) {
            Promise.all([
                getHomeData()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                setIntroData('intro' in data ? data.intro : undefined);
                setServicesData('services' in data ? data.services : undefined);
                setSocialData('social' in data ? data.social : undefined);
                setContactData('contact' in data ? data.contact : undefined);
                setLoading(false);
            }).catch(error => {
                console.log('Error al recuperar los artículos: ' + error);
            });
        }
    }, []);

    // noinspection JSUnresolvedVariable
    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main home">
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        <section className="row section-presentation">
                            <div className="col-12 col-md-4 col-lg-3 text-center">
                                <img src={webServiceURL + '/images/' + introData.imageSrc}
                                     alt={introData.bossName} width="300" height="300"/>
                            </div>
                            <div className="col-12 col-md-6 col-lg-9 mt-5  mt-md-auto presentation-container">
                                <span className="title">¿Quién es {introData.bossName}?</span>
                                <p className="presentation">{introData.description}</p>
                            </div>
                        </section>
                        <section className="section-images">
                            <div className="row"><InstagramHeader/></div>
                            <div className="row images-container">
                                {
                                    Object.keys(socialData.images).map((key) => (
                                        <InstagramImageBox
                                            key={key}
                                            src={webServiceURL + '/images/' + socialData.images[key].image.name}
                                            alt={socialData.images[key].image.alt}
                                            width={socialData.images[key].image.width}
                                            height={socialData.images[key].image.height}
                                        />
                                    ))
                                }
                            </div>
                        </section>
                        <section className="section-business-services">
                            <div className="services-title"><span>¿Qué ofrecemos?</span></div>
                            <div className="services-container row">
                                {
                                    Object.keys(servicesData).map((key) => (
                                        <ServiceBox
                                            key={key} alt={servicesData[key].image.alt}
                                            width={servicesData[key].image.width}
                                            height={servicesData[key].image.height}
                                            imageSrc={webServiceURL + '/images/' + servicesData[key].image.name}
                                            title={servicesData[key].title}
                                            description={servicesData[key].description}
                                        />
                                    ))
                                }
                            </div>
                        </section>
                        <section className="section-business-contact">
                            <div className="contact-title"><span>Contacta con {contactData.businessName}</span></div>
                            <div className="contact-container">
                                <span><strong>Dirección:</strong> {contactData.address}</span>
                                {'email' in contactData &&
                                <span><strong>Email:</strong> {contactData.email}</span>
                                }
                                {'phoneNumber' in contactData &&
                                <span><strong>Teléfono:</strong> {contactData.phoneNumber}</span>
                                }
                                <h3 className="mt-3"><strong>Horario</strong></h3>
                                {Object.keys(contactData.businessHours).map((key) => (
                                    <span className="m-1" key={key}>
                                        <strong>{formatDay(key)}: </strong> |
                                        {Object.keys(contactData.businessHours[key]).map((index) => (
                                            <span
                                                key={index}> {contactData.businessHours[key][index].opensAt} a {contactData.businessHours[key][index].closesAt} |</span>
                                        ))}
                                    </span>
                                ))}
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