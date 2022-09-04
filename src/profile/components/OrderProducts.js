import React from 'react';
import {Modal} from "react-bootstrap";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import "../../store/components/css/shopping-cart.scss";

import OrderProduct from "./OrderProduct";

function OrderProducts(props) {
    const renderProducts = () => {
        let render = [];

        // noinspection JSUnusedLocalSymbols
        Object.entries(props.orderProducts).forEach(([key, product]) => {
            render.push(<OrderProduct key={product.id} product={product}/>)
        })

        return render;
    };
    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} size="lg"
               aria-labelledby="contained-modal-title-vcenter" className="shopping-cart" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                    <ShoppingCartIcon/> Productos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.orderProducts.length > 0 ? renderProducts() :
                    <div className="col-12 text-center">
                        <h5 className="fw-bold m-1">No hay productos en el pedido.</h5>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderProducts;