import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import {cancelPendingOrder, statusCancelled, statusDone} from '../../services/order';
import {formatDate} from '../../services/tools';

import './css/order.scss';

function Order(props) {
    const statusEnum = {
        0: 'Pendiente',
        1: 'En preparación',
        2: 'Cancelado',
        3: 'Enviado',
        4: 'Recibido',
    }

    const [cancelling, setCancelling] = useState(false);

    const orderID = props.order.id;
    const status = props.order.status;
    // noinspection JSUnresolvedVariable
    const date = new Date(props.order.createdAt.date);
    const amount = props.order.amount;
    const uuid = props.order.uuid;
    const classNameStatus = status === statusCancelled ?
        'text-danger' : status === statusDone ? 'text-success' : 'text-info-custom';

    const onCancelOrder = () => {
        setCancelling(true);
        Promise.all([
            cancelPendingOrder(orderID)
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];
            props.onOrderCancelled(data.result);
            setCancelling(false);
        }).catch(error => {
            console.log('Error al recuperar la configuración del horario del negocio: ' + error);
            setCancelling(false);
        });
    };

    return (
        <article className="order">
            <div className="uuid-date-container text-start">
                <p className="fw-bold">UUID: {uuid}</p>
                <p>{formatDate(date)} a las {date.getHours()}:{date.getMinutes() < 10 && '0'}{date.getMinutes()}</p>
            </div>
            <p className={classNameStatus + ' fw-bold'}>{statusEnum[status]}</p>
            <p className="fs-5 fw-bold">{amount}€</p>
            {status === 0 && (cancelling ?
                    <div className="login-loader">
                        <div className="lds-dual-ring"/>
                    </div> :
                    <button className="btn btn-profile custom-btn" onClick={() => {
                        onCancelOrder()
                    }}>
                        Cancelar <ClearIcon/>
                    </button>
            )}
        </article>
    );
}

export default Order;