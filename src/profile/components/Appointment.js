import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import './css/appointment.scss'

import {formatDate} from "../../services/tools";

export const statusPending = 0;
export const statusCancelled = 1;
export const statusDone = 2;

function Appointment(props) {
    const statusEnum = {
        0: 'Pendiente',
        1: 'Cancelada',
        2: 'Finalizada',
    }

    const date = new Date(props.appointment.bookingDateAt.date);
    const status = props.appointment.status;
    const classNameStatus = status === statusCancelled ?
        'text-danger' : status === statusDone ? 'text-success' : 'text-info';
    const onCancelAppointment = () => {
        const id = props.appointment.id;
    };

    return(
        <article className="appointment-container fw-bold">
            <p>{formatDate(date)} a las {date.getHours()}:{date.getMinutes() < 10 && '0'}{date.getMinutes()}</p>
            <p className={classNameStatus}>Estado: {statusEnum[status]}</p>
            {status === 0 && <button className="btn btn-profile custom-btn" onClick={() => {onCancelAppointment()}}>
                Cancelar <ClearIcon/>
            </button>}
        </article>
    );
}

export default Appointment;