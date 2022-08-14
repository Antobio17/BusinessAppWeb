import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Tab, Tabs} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {pageTransition, pageVariants} from '../App';

import './css/profile-page.scss';

import TabPanel from "../common/components/TabPanel";
import ProfileTabPanel from "./components/ProfileTabPanel";
import PostalAddressTabPanel from "./components/PostalAddressTabPanel";
import AppointmentTabPanel from "./components/AppointmentTabPanel";
import OrderTabPanel from "./components/OrderTabPanel";
import Loading from "../common/components/Loading";

import {getUserData} from "../services/user";

function ProfilePage() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(undefined);

    const onChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (profileData === undefined) {
            Promise.all([
                getUserData()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                console.log(data);
                setProfileData(data);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        }

        setLoading(profileData === undefined);
    }, [loading, profileData]);

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main profile">
                <section className="profile-intro">
                    <h1>Mi Perfil</h1>
                    <p>Busca en nuestro calendario un hueco para ti ¡No tardes en reservar tu cita!</p>
                </section>
                {loading ? <Loading/> : (
                    <>
                        <Tabs value={value} onChange={onChange} variant="scrollable" scrollButtons="auto"
                              aria-label="scrollable auto tabs example">
                            <Tab label={<PersonIcon/>}/>
                            <Tab label={<HomeIcon/>}/>
                            <Tab label={<DateRangeIcon/>}/>
                            <Tab label={<ShoppingCartIcon/>}/>
                        </Tabs>
                        <TabPanel value={value} index={0}><ProfileTabPanel profileData={profileData}/></TabPanel>
                        <TabPanel value={value} index={1}><PostalAddressTabPanel/></TabPanel>
                        <TabPanel value={value} index={2}><AppointmentTabPanel/></TabPanel>
                        <TabPanel value={value} index={3}><OrderTabPanel/></TabPanel>
                    </>
                )}
            </main>
        </motion.div>
    );
}

export default ProfilePage;