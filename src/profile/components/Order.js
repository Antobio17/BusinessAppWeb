import React, {useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import {cancelPendingOrder, statusCancelled, statusDone, statusPaid} from '../../services/order';
import {formatDate} from '../../services/tools';

import './css/order.scss';
import OrderProducts from "./OrderProducts";

function Order(props) {
    const statusEnum = {
        0: 'Pendiente',
        1: 'Pagado',
        2: 'En preparación',
        3: 'Cancelado',
        4: 'Enviado',
        5: 'Entregado',
    }

    const [cancelling, setCancelling] = useState(false);
    const [show, setShow] = useState(false);

    const orderID = props.order.id;
    const status = props.order.status;
    // noinspection JSUnresolvedVariable
    const date = new Date(props.order.createdAt.date);
    const amount = props.order.amount;
    const id = props.order.id;
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

    const onShowProducts = () => {
        setShow(true);
        console.log(props.order);
    };

    return (
        <>
            <OrderProducts show={show} setShow={setShow} orderProducts={JSON.parse(props.order.data)}/>
            <article className="order">
                <div className="id-date-container text-start">
                    <p className="fw-bold order-open-products" onClick={onShowProducts}>
                        <RemoveRedEyeIcon/> ID: {id}
                    </p>
                    <p>{formatDate(date)} a las {date.getHours()}:{date.getMinutes() < 10 && '0'}{date.getMinutes()}</p>
                </div>
                <p className={classNameStatus + ' fw-bold'}>{statusEnum[status]}</p>
                <p className="fs-5 fw-bold">{amount}€</p>
                {status === statusPaid && (cancelling ?
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
        </>
    );
}

export default Order;