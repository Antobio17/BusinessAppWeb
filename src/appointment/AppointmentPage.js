import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Calendar from 'react-calendar';

import {pageTransition, pageVariants} from "../App";

import './css/appointment-page.scss';

import Loading from "../common/components/Loading";
import SelectedDay from "./components/SelectedDay";

import {formatDate} from "../services/tools";

function AppointmentPage() {
    const date = new Date();
    const minDate = new Date(date.getTime() + 86400000);
    const maxDate = new Date(date.getTime() + 2592000000);

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedDay, setSelectedDay] = useState(undefined);
    const [selectedDayFormatted, setSelectedDayFormatted] = useState(undefined);
    const [hours, setHours] = useState([{0: '08:00:00', 1: '14:00:00'}, {0: '16:00:00', 1: '21:00:00'}]);
    const [appointmentDuration, setAppointmentDuration] = useState(60);

    const onClickDay = (day) => {
        setShow(true);
        setSelectedDay(day);
        setSelectedDayFormatted(formatDate(day));
    };

    useEffect(() => {
        setLoading(false);
    }, [loading, show]);

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main appointment">
                <section className="appointment-intro">
                    <h1>Citas</h1>
                    <p>Busca en nuestro calendario un hueco para ti ¡No tardes en reservar tu cita!</p>
                </section>
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        <Calendar minDate={minDate} maxDate={maxDate} onClickDay={(day) => onClickDay(day)}/>
                        <SelectedDay show={show} setShow={setShow} selectedDay={selectedDay}
                                     selectedDayFormatted={selectedDayFormatted} hours={hours}
                                     appointmentDuration={appointmentDuration}/>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default AppointmentPage;