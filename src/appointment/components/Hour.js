import React, {useState} from 'react';

import './css/hour.scss';

import {bookUserAppointment} from '../../services/appointment';
import {validatePhoneNumber} from "../../services/tools";

function Hour(props) {
    const [booking, setBooking] = useState(false);

    const bookAppointment = () => {
        const day = props.day;
        const splitHour = props.hour.split(':');
        const bookingDateAt = day.setHours(splitHour[0], splitHour[1], splitHour[2]) / 1000;

        setBooking(true);
        props.setIsBooking(true);
        if (props.isWorker && !validatePhoneNumber(props.phoneNumber)) {
            props.setMessageAlert({
                'type': 'danger',
                'text': 'El teléfono no tiene un formato válido.',
            });
            setBooking(false);
            props.setIsBooking(false);
        } else {
            Promise.all([
                bookUserAppointment(bookingDateAt, props.phoneNumber.length > 0 ? props.phoneNumber : null)
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                if (data.result) {
                    props.onBookingMade();
                    setTimeout(() => {
                        document.location.href = '/perfil?tab=2';
                    }, 2000);
                } else {
                    props.setMessageAlert({
                        'type': 'danger',
                        'text': 'Ha ocurrido un error al intentar reservar la cita.',
                    });
                }
                setBooking(false);
                props.setIsBooking(false);
            }).catch(error => {
                console.log('Error al recuperar al realizar la reserva de la cita: ' + error);
                props.setMessageAlert({
                    'type': 'danger',
                    'text': 'Ha ocurrido un error al intentar reservar la cita.',
                });
                setBooking(false);
                props.setIsBooking(false);
            });
        }
    };

    return (
        <article className="hour">
            <p className="col-6 m-auto fw-bold">{props.hour}</p>
            {props.available && !props.hasPendingAppointment ? (
                    booking ?
                        <div className="login-loader">
                            <div className="lds-dual-ring"/>
                        </div> :
                        <button className="btn btn-appointment custom-btn col-6 fw-bold" disabled={props.isBooking}
                                onClick={() => bookAppointment()}>
                            Reservar
                        </button>
                ) :
                <button className="col-6 btn btn-appointment custom-btn btn-appointment-disabled fw-bold" disabled>
                    {props.hasPendingAppointment ? 'Reserva Activa' : 'No disponible'}
                </button>
            }
        </article>
    );
}

export default Hour;