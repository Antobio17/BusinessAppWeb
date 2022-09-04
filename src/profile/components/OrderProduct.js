import React from "react";

import {webServiceURL} from "../../App";
import '../../store/components/css/cart-product.scss';
import './css/order-product.scss';

function OrderProduct(props) {
    const {id, image, name, amount, quantity} = props.product;

    return (
        <div key={id} className="row align-items-center cart-product order-product">
            <div className="col-12 col-md-2">
                <img src={webServiceURL + '/images/' + image.name} alt={image.alt} width="80" height="70"/>
            </div>
            <div className="col-12 col-md-6"><span className="cart-product-name">{name}</span></div>
            <div className="row col-12 col-md-4">
                <div className="col-6 m-auto text-end cart-product-amount order-product-amount">
                    <span className="fw-bold">{amount}€ x {quantity}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderProduct;