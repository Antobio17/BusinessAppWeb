import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Select from 'react-select';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Alert from "react-bootstrap/Alert";

import "./css/shopping-cart.scss";

import CartProduct from "./CartProduct";

import {notifyNewOrder, notifyPaymentOrder} from "../../services/order";
import PaymentForm from "./PaymentForm";
import {Link} from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function ShoppingCart(props) {
    const [show, setShow] = useState(false);
    const [postalAddressID, setPostalAddressID] = useState(undefined);
    const [order, setOrder] = useState(undefined);
    const [creatingOrder, setCreatingOrder] = useState(false);

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
        setCreatingOrder(true);
        Promise.all([
            notifyNewOrder(
                postalAddressID, parseFloat(totalPrice(props.cartProducts)), JSON.stringify(props.cartProducts)
            )
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];
            setOrder(data.data ?? undefined);
            setCreatingOrder(false);
        }).catch(error => {
            console.log(error);
            setCreatingOrder(false);
        });
    }

    const onHide = () => {
        setShow(false);
        setPostalAddressID(undefined);

        if (order !== undefined) {
            Promise.all([
                notifyPaymentOrder(order.uuid, false)
            ]).then(response => {
                // noinspection JSUnusedLocalSymbols
                const data = response.length > 0 ? response[0] : [];
                setOrder(undefined);
            }).catch(error => {
                console.log('Error en la eliminación del pedido no pagado: ' + error);
                setOrder(undefined);
            });
        }
    };

    return (
        <>
            <div className="shopping-cart-button">
                <button onClick={() => setShow(true)} className="custom-btn">
                    <ShoppingCartIcon/> Ver carrito
                </button>
            </div>
            <Modal show={show} onHide={onHide} size="lg"
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
                    <>
                        <div className="mt-3 mb-3">
                            <Select options={getOptionAddresses()} placeholder={'Seleccione una dirección...'}
                                    onChange={(e) => {
                                        setPostalAddressID(e.value)
                                    }}
                                    isDisabled={order !== undefined}/>
                        </div>
                        {Object.keys(props.addresses).length === 0 &&
                            <Alert key="warning" variant="warning">
                                <Link to="/perfil?tab=1" className="link-create-postal-address">
                                    No tienes ninguna dirección creada. Pulsa aquí para añadir una a tu perfil.
                                </Link>
                            </Alert>
                        }
                    </>
                    }
                    {order !== undefined &&
                    <div className="mt-3 mb-3">
                        <Elements stripe={stripePromise}>
                            <PaymentForm order={order}/>
                        </Elements>
                    </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="total-amount">
                        <span className="fw-bold">Total: {totalPrice(props.cartProducts)} €</span>
                    </div>
                    {props.cartProducts.length > 0 && postalAddressID !== undefined && order === undefined &&
                    <div className="payment">
                        {creatingOrder ?
                            <div className="login-loader">
                                <div className="lds-dual-ring"/>
                            </div> :
                            <button className="btn btn-payment-process custom-btn" onClick={onSubmitOrder}>
                                Continuar
                            </button>
                        }
                    </div>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShoppingCart;