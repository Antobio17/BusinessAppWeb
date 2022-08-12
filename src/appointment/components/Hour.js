import React from 'react';

import './css/hour.scss';

function Hour(props) {
    return (
        <article className="hour">
            <p className="col-6 m-auto fw-bold">{props.hour}</p>
            {props.available ?
                <button className="btn btn-appointment custom-btn col-6 fw-bold" onClick={() => {
                    props.addToCart(props.product)
                }}>
                    Reservar
                </button> :
                <button className="col-6 btn btn-appointment custom-btn btn-appointment-disabled fw-bold" disabled>
                    No disponible
                </button>
            }
        </article>
    );
}

export default Hour;