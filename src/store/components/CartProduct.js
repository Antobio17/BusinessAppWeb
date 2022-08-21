import React from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

import {webServiceURL} from "../../App";
import './css/cart-product.scss';

function CartProduct(props) {
    const {id, image, name, amount, quantity} = props.product;
    const canDelete = quantity > 1;

    return (
        <div key={id} className="row align-items-center cart-product">
            <div className="col-12 col-md-2">
                <img src={webServiceURL + '/images/' + image.name} alt={image.alt} width="80" height="70"/>
            </div>
            <div className="col-12 col-md-6"><span className="cart-product-name">{name}</span></div>
            <div className="row col-12 col-md-4">
                <div className="col-6 m-auto text-end cart-product-amount">
                    <span className="fw-bold">{amount}€ x {quantity}</span>
                </div>
                <div className="col-6 m-auto text-end cart-product-actions">
                    <button onClick={() => props.addToCart(props.product)}><AddIcon/></button>
                    {canDelete &&
                    <button onClick={() => props.removeFromCart(props.product, false)}><RemoveIcon/></button>
                    }
                    <button onClick={() => props.removeFromCart(props.product, true)}><DeleteIcon/></button>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;