import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Alert from 'react-bootstrap/Alert';
import ReactPaginate from 'react-paginate';

import {pageTransition, pageVariants} from '../../App';
import {getUserOrders, getUserPendingOrders} from '../../services/order';

import './css/order-tab-panel.scss';

import Loading from '../../common/components/Loading';
import Order from "./Order";

function OrderTabPanel() {
    const [loading, setLoading] = useState(true);
    const [pendingOrders, setPendingOrders] = useState(undefined);
    const [orders, setOrders] = useState(undefined);
    const [messageAlert, setMessageAlert] = useState(undefined);

    // Orders Pagination
    const [page, setPage] = useState(0);
    const limit = 6;
    const offset = page * limit;
    const displayItems = orders !== undefined ? orders.slice(offset, offset + limit) : undefined;
    const onChangePage = ({selected}) => {
        setPage(selected);
    };

    const onOrderCancelled = (result) => {
        if (result) {
            setPendingOrders(undefined);
            setOrders(undefined);
            setMessageAlert({
                'type': 'success',
                'message': 'Has cancelado tu pedido con éxito.',
            });
        }  else {
            setMessageAlert({
                'type': 'danger',
                'message': 'Ha ocurrido un error al intentar cancelar el pedido.',
            });
        }
    };

    const renderOrders = (ordersArray) => {
        let render = [];

        ordersArray.forEach(order => {
            render.push(<Order key={order.id} order={order} onOrderCancelled={onOrderCancelled}/>);
        });

        return render;
    };

    useEffect(() => {
        if (pendingOrders === undefined) {
            Promise.all([
                getUserPendingOrders()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                setPendingOrders('orders' in data ? data.orders : undefined);
            }).catch(error => {
                console.log('Error al recuperar los pedidos pendientes del cliente: ' + error);
            });
        }

        if (orders === undefined) {
            Promise.all([
                getUserOrders(true)
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                setOrders('orders' in data ? data.orders : undefined);
            }).catch(error => {
                console.log('Error al recuperar los pedidos del cliente: ' + error);
            });
        }

        setLoading(pendingOrders === undefined || orders === undefined);
    }, [loading, pendingOrders, orders]);

    return (
        <>
            <section className="profile-tab-header">
                <h4>Tus pedidos</h4>
                <p>
                    Puedes ver el historial de tus pedidos junto a su estado realizados aquí.
                </p>
            </section>
            {loading ? <div className="loading-order-tab-panel"><Loading/></div> : (
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                            transition={pageTransition}>
                    <section className="pending-orders">
                        {messageAlert !== undefined &&
                        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                    transition={pageTransition}>
                            <Alert key={messageAlert.type} variant={messageAlert.type} className="text-center m-2"
                                   onClose={() => setMessageAlert(undefined)} dismissible>
                                <strong>{messageAlert.message}</strong>
                            </Alert>
                        </motion.div>
                        }
                        {pendingOrders === undefined || pendingOrders.length === 0 ?
                            <h6 className="fw-bold text-center m-3">
                                No tienes ningún pedido pendiente ¡realiza tus pedidos cuando lo desees!
                            </h6> :
                            renderOrders(pendingOrders)
                        }
                    </section>
                    <section className="order-list text-center">
                        <h5>Historial de citas</h5>
                        {orders === undefined || orders.length === 0 ?
                            <h6 className="fw-bold text-center m-3">
                                Aún no has realizado ningún pedido.
                            </h6> :
                            <>
                                {renderOrders(displayItems)}
                                <ReactPaginate
                                    previousLabel={"Anterior"} nextLabel={"Siguiente"}
                                    pageCount={Math.ceil(orders.length / limit)}
                                    onPageChange={onChangePage} containerClassName={"appointments-pagination"}
                                    disabledClassName={"pagination-disabled-button"}
                                    activeClassName={"pagination-active"}
                                    previousLinkClassName={"pagination-previous-button"}
                                    nextLinkClassName={"pagination-next-button"}
                                />
                            </>
                        }
                    </section>
                </motion.div>
            )}
        </>
    );
}

export default OrderTabPanel;