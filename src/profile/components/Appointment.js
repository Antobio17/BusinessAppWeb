import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import './css/appointment.scss'

import {formatDate} from "../../services/tools";
import {cancelUserBookedAppointment} from "../../services/appointment";

export const statusPending = 0;
export const statusCancelled = 1;
export const statusDone = 2;

function Appointment(props) {
    const statusEnum = {
        0: 'Pendiente',
        1: 'Cancelada',
        2: 'Finalizada',
    }

    const [cancelling, setCancelling] = useState(false);

    const date = new Date(props.appointment.bookingDateAt.date);
    const status = props.appointment.status;
    const classNameStatus = status === statusCancelled ?
        'text-danger' : status === statusDone ? 'text-success' : 'text-info';

    const onCancelAppointment = () => {
        setCancelling(true);
        Promise.all([
            cancelUserBookedAppointment(props.userEmail)
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];
            props.onBookingCancelled(data.result);
            setCancelling(false);
        }).catch(error => {
            console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            setCancelling(false);
        });
    };

    return (
        <article className="appointment-container fw-bold">
            <p>{formatDate(date)} a las {date.getHours()}:{date.getMinutes() < 10 && '0'}{date.getMinutes()}</p>
            <p className={classNameStatus}>{statusEnum[status]}</p>
            {status === 0 && (cancelling ?
                    <div className="login-loader">
                        <div className="lds-dual-ring"/>
                    </div> :
                    <button className="btn btn-profile custom-btn" onClick={() => {
                        onCancelAppointment()
                    }}>
                        Cancelar <ClearIcon/>
                    </button>
            )}
        </article>
    );
}

export default Appointment;