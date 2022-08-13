import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Calendar from 'react-calendar';
import Alert from 'react-bootstrap/Alert';

import {pageTransition, pageVariants} from '../App';

import './css/appointment-page.scss';

import Loading from '../common/components/Loading';
import SelectedDay from './components/SelectedDay';

import {formatDate} from '../services/tools';
import {getPendingUserAppointments, getScheduleConfig} from '../services/appointment';

function AppointmentPage() {
    const date = new Date();
    const minDate = new Date(date.getTime() + 86400000);
    const maxDate = new Date(date.getTime() + 2592000000);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shifts, setShifts] = useState(undefined);
    const [selectedDay, setSelectedDay] = useState(undefined);
    const [appointmentDuration, setAppointmentDuration] = useState(undefined);
    const [selectedDayFormatted, setSelectedDayFormatted] = useState(undefined);
    const [hasPendingAppointment, setHasPendingAppointment] = useState(undefined);
    const [bookingMade, setBookingMade] = useState(false);

    const onClickDay = (day) => {
        setShow(true);
        setSelectedDay(day);
        setSelectedDayFormatted(formatDate(day));
    };

    const onBookingMade = () => {
        setBookingMade(true);
        setShow(false);
        setHasPendingAppointment(undefined);
        setLoading(true);
    }

    useEffect(() => {
        if (shifts === undefined || appointmentDuration === undefined) {
            Promise.all([
                getScheduleConfig()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                setShifts('shifts' in data ? data.shifts : undefined);
                setAppointmentDuration('appointmentDuration' in data ? data.appointmentDuration : undefined);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        }

        if (hasPendingAppointment === undefined) {
            Promise.all([
                getPendingUserAppointments()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                setHasPendingAppointment(data.length > 0);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        }
        setLoading(
            shifts === undefined || appointmentDuration === undefined || hasPendingAppointment === undefined
        );
    }, [loading, hasPendingAppointment, shifts, appointmentDuration]);

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
                        {bookingMade &&
                        <Alert key={'success'} variant={'success'} onClose={() => setBookingMade(false)}
                               dismissible>
                            <strong>Has realizado tu reserva correctamente</strong>
                        </Alert>
                        }
                        <Calendar minDate={minDate} maxDate={maxDate} onClickDay={(day) => onClickDay(day)}/>
                        {selectedDay !== undefined && selectedDayFormatted !== undefined &&
                        <SelectedDay appointmentDuration={appointmentDuration} onBookingMade={onBookingMade}
                                     show={show} setShow={setShow} selectedDay={selectedDay}
                                     selectedDayFormatted={selectedDayFormatted} shifts={shifts}
                                     hasPendingAppointment={hasPendingAppointment}/>
                        }
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default AppointmentPage;