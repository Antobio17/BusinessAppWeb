import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Select from 'react-select';

import "./css/shopping-cart.scss";

import CartProduct from "./CartProduct";

import {notifyNewOrder} from "../../services/order";

function ShoppingCart(props) {
    const [show, setShow] = useState(false);
    const [postalAddressID, setPostalAddressID] = useState(undefined);

    const totalPrice = (cartItems) => {
        return cartItems.reduce((a, c) => a + (c.amount * c.quantity), 0).toFixed(2)
    };

    const getOptionAddresses = () => {
        let options = [];

        // noinspection JSUnusedLocalSymbols
        Object.entries(props.addresses).forEach(([key, address]) => {
            options.push({'value': address.id, 'label': address.name});
        });

        return options;
    };

    const onSubmitOrder = () => {
        Promise.all([
            notifyNewOrder(
                postalAddressID, parseFloat(totalPrice(props.cartProducts)), JSON.stringify(props.cartProducts)
            )
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];
            console.log(data);
        }).catch(error => console.log(error));
    }

    return (
        <>
            <div className="shopping-cart-button">
                <button onClick={() => setShow(true)} className="custom-btn">
                    <ShoppingCartIcon/> Ver carrito
                </button>
            </div>
            <Modal show={show} onHide={() => {
                setShow(false);
                setPostalAddressID(undefined);
            }} size="lg"
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
                    {props.addresses !== undefined &&
                    <div className="mt-3 mb-3">
                        <Select options={getOptionAddresses()} placeholder={'Seleccione una dirección...'}
                                onChange={(e) => {setPostalAddressID(e.value)}}/>
                    </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="total-amount">
                        <span className="fw-bold">Total: {totalPrice(props.cartProducts)} €</span>
                    </div>
                    {props.cartProducts.length > 0 && postalAddressID !== undefined &&
                    <div className="payment">
                        <button className="btn btn-payment-process custom-btn" onClick={onSubmitOrder}>
                            Pagar
                        </button>
                    </div>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShoppingCart;