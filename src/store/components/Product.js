import React from "react";

import {webServiceURL} from "../../App";
import './css/product.scss';
import '../../common/components/css/button.scss';

function Product(props) {
    const {amount, name, stock, image} = props.product;

    return (
        <article className="col-12 col-md-4 col-lg-4 product">
            <img src={webServiceURL + '/images/' + image.name} alt={image.alt} width={image.width}
                 height={image.height}/>
            <p><span className="name">{name}</span></p>
            <p><span className="amount">{amount}€</span></p>
            {stock > 0 ?
                <button className="btn btn-add-to-cart custom-btn" onClick={() => {props.addToCart(props.product)}}>
                    Añadir al carrito
                </button> :
                <p className="out-of-stock text-muted">SIN STOCK</p>
            }
        </article>
    );
}

export default Product;