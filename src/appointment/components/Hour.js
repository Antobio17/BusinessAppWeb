import React, {useState} from 'react';

import './css/hour.scss';

import {bookUserAppointment} from '../../services/appointment';

function Hour(props) {
    const [booking, setBooking] = useState(false);

    const bookAppointment = () => {
        const day = props.day;
        const splitHour = props.hour.split(':');
        const bookingDateAt = day.setHours(splitHour[0], splitHour[1], splitHour[2]) / 1000;

        setBooking(true);
        Promise.all([
            bookUserAppointment(bookingDateAt)
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];

            if (data.result) {
                props.onBookingMade();
            }
            setBooking(false);
        }).catch(error => {
            console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            setBooking(false);
        });
    };

    return (
        <article className="hour">
            <p className="col-6 m-auto fw-bold">{props.hour}</p>
            {props.available && !props.hasPendingAppointment ? (
                    booking ?
                        <div className="login-loader">
                            <div className="lds-dual-ring"/>
                        </div> :
                        <button className="btn btn-appointment custom-btn col-6 fw-bold" onClick={() => bookAppointment()}>
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