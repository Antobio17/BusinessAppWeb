import React from 'react';

import './css/hour.scss';

function Hour(props) {
    return (
        <article className="hour">
            <p>{props.hour}</p>
            {props.available ?
                <button className="btn btn-add-to-cart custom-btn" onClick={() => {
                    props.addToCart(props.product)
                }}>
                    Reservar
                </button> :
                <button className="btn btn-add-to-cart custom-btn custom-btn-disabled" disabled>
                    No disponible
                </button>
            }
        </article>
    );
}

export default Hour;