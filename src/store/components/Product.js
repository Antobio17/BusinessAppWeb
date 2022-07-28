import React from "react";

import './css/product.scss';
import '../../common/components/css/button.scss';

function Product(props) {

    return (
        <article className="col-12 col-md-4 col-lg-4 product">
            <img src={props.src} alt="Producto" width="230" height="200"/>
            <p><span className="name">{props.name}</span></p>
            <p><span className="amount">{props.amount}€</span></p>
            {props.stock > 0 ?
                <button className="btn btn-add-to-cart custom-btn">
                    Añadir al carrito
                </button> :
                <p className="out-of-stock text-muted">SIN STOCK</p>
            }
        </article>
    );
}

export default Product;