import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
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
import {getUserPendingAppointments} from "../services/appointment";

function ProfilePage() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState(
        searchParams.get('tab') !== null ? parseInt(searchParams.get('tab')) : 0
    );
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(undefined);
    const [pendingAppointment, setPendingAppointment] = useState(undefined);

    const onChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (profileData === undefined) {
            Promise.all([
                getUserData()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                setProfileData(data);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        }

        if (pendingAppointment === undefined) {
            Promise.all([
                getUserPendingAppointments()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                setPendingAppointment(data.length > 0 ? data[0] : null);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        }

        setLoading(
            profileData === undefined || pendingAppointment === undefined
        );
    }, [loading, profileData, pendingAppointment]);

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main profile">
                <section className="profile-intro">
                    <h1>Mi Perfil</h1>
                    <p>Busca en nuestro calendario un hueco para ti ¡No tardes en reservar tu cita!</p>
                </section>
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        <Tabs value={value} onChange={onChange} variant="scrollable" scrollButtons="auto"
                              aria-label="scrollable auto tabs example">
                            <Tab label={<><PersonIcon/><b>Datos</b></>}/>
                            <Tab label={<><HomeIcon/><b>Direcciones</b></>}/>
                            <Tab label={<><DateRangeIcon/><b>Citas</b></>}/>
                            <Tab label={<><ShoppingCartIcon/><b>Pedidos</b></>}/>
                        </Tabs>
                        <TabPanel value={value} index={0}><ProfileTabPanel profileData={profileData}/></TabPanel>
                        <TabPanel value={value} index={1}>
                            <PostalAddressTabPanel postalAddresses={profileData.postalAddresses}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <AppointmentTabPanel pendingAppointment={pendingAppointment} userEmail={profileData.email}
                                                 setPendingAppointment={setPendingAppointment}/>
                        </TabPanel>
                        <TabPanel value={value} index={3}><OrderTabPanel/></TabPanel>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default ProfilePage;