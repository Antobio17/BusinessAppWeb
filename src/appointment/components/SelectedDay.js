import {Modal} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import TodayIcon from '@material-ui/icons/Today';
import Alert from "react-bootstrap/Alert";

import {pageTransition, pageVariants} from '../../App';

import Hour from './Hour';
import Loading from '../../common/components/Loading';

import {countAppearances, incrementHour, isGreaterThan} from '../../services/tools';
import {getPendingAppointments} from '../../services/appointment';

import './css/selected-day.scss';

function SelectedDay(props) {
    const shifts = props.shifts;
    const selectedWeekDay = props.selectedDay.getDay();
    const appointmentDuration = props.appointmentDuration;

    const [loading, setLoading] = useState(true);
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [messageAlert, setMessageAlert] = useState(undefined);

    const [phoneNumber, setPhoneNumber] = useState('');

    const getRenderHours = () => {
        let render = [], hour;

        if (selectedWeekDay in shifts) {
            Object.entries(shifts[selectedWeekDay]).forEach(([key, {opensAt, closesAt}]) => {
                hour = opensAt;
                render.push(<h4 key={key} className="shift-title fw-bold">Turno: {opensAt} a {closesAt}</h4>);
                do {
                    render.push(
                        <Hour key={hour} hour={hour} day={props.selectedDay} onBookingMade={props.onBookingMade}
                              available={countAppearances(pendingAppointments, hour) < props.numWorkers}
                              hasPendingAppointment={props.hasPendingAppointment && !props.isWorker}
                              isWorker={props.isWorker} phoneNumber={phoneNumber}
                              setMessageAlert={setMessageAlert}/>
                    );
                    hour = incrementHour(hour, appointmentDuration);
                } while (isGreaterThan(closesAt, hour));
            });
        } else {
            render.push(<h2 key={0} className="closes-title fw-bold">Cerrado</h2>);
        }

        return render;
    };

    useEffect(() => {
        if (selectedWeekDay in shifts) {
            const startDate = props.selectedDay.getTime() / 1000;
            const endDate = (new Date(props.selectedDay.getTime())).setHours(23, 59, 59) / 1000;

            Promise.all([
                getPendingAppointments(startDate, endDate)
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                let hoursPending = [];
                // noinspection JSUnusedLocalSymbols
                Object.entries(data).forEach(([key, {bookingDateAt}]) => {
                    hoursPending.push(bookingDateAt.date.split(' ')[1].split('.')[0])
                });
                setPendingAppointments(hoursPending);
                setLoading(false);
            }).catch(error => {
                console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            });
        } else {
            setLoading(false);
        }
    }, [props.selectedDay, messageAlert]);

    return (
        <Modal show={props.show} onHide={() => {
            props.setShow(false);
            setLoading(true);
        }} size="lg"
               aria-labelledby="contained-modal-title-vcenter" className="selected-day" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                    <TodayIcon/> {props.selectedDayFormatted}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <Loading/> :
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition} className="select-day-appointments-container">
                        {props.isWorker ?
                            <>
                                <input type="tel" name="name" placeholder="Teléfono del cliente..." value={phoneNumber}
                                       className="input-user-phone-number"
                                       onChange={(e) => setPhoneNumber(e.target.value)}/>
                                {messageAlert !== undefined &&
                                <Alert key={messageAlert.type} variant={messageAlert.type}
                                       onClose={() => setMessageAlert(undefined)} dismissible>
                                    <strong>{messageAlert.text}</strong>
                                </Alert>
                                }
                            </> :
                            <>
                                {props.hasPendingAppointment &&
                                <Alert key={'warning'} variant={'warning'}>
                                    <strong>
                                        No puedes reservar cita debido a que ya tienes una pendiente,
                                        revisa tu perfil
                                    </strong>
                                </Alert>
                                }
                            </>
                        }
                        {getRenderHours()}
                    </motion.div>
                }
            </Modal.Body>
        </Modal>
    );
}

export default SelectedDay;