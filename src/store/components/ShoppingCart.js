import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import CartProduct from "./CartProduct";
import "./css/shopping-cart.scss";

function ShoppingCart(props) {
    const [show, setShow] = useState(false);

    const totalPrice = (cartItems) => {
        return cartItems.reduce((a, c) => a + (c.amount * c.quantity), 0).toFixed(2)
    };

    return (
        <>
            <div className="shopping-cart-button">
                <button onClick={() => setShow(true)} className="custom-btn">
                    <ShoppingCartIcon/> Ver carrito
                </button>
            </div>
            <Modal show={show} onHide={() => setShow(false)} size="lg"
                   aria-labelledby="contained-modal-title-vcenter" className="shopping-cart" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                        <ShoppingCartIcon/> Carrito de compra
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.cartProducts.length > 0 ? props.cartProducts.map(product => (
                            <CartProduct
                                key={product.id}
                                product={product}
                                addToCart={props.addToCart}
                                removeFromCart={props.removeFromCart}
                            />
                        )) :
                        <div className="col-12 text-center">
                            <h5 className="fw-bold m-1">El carrito de compra está vacío.</h5>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="total-amount">
                        <span className="fw-bold">Total: {totalPrice(props.cartProducts)} €</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShoppingCart;