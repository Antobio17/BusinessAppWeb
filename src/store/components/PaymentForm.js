import React, {useState} from 'react';
import {motion} from "framer-motion";
import {Box} from '@material-ui/core';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Alert from "react-bootstrap/Alert";

import './css/payment-form.scss';
import {pageTransition, pageVariants} from "../../App";

import {notifyPaymentOrder} from "../../services/order";
import {localStorageKeyProducts} from "../StorePage";

function PaymentForm(props) {
    const [messageAlert, setMessageAlert] = useState(undefined);
    const [complete, setComplete] = useState(false);
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);

    const elements = useElements();
    const stripe = useStripe();

    const onSubmitPayment = async (e) => {
        e.preventDefault();
        setPaying(true);
        setMessageAlert(undefined);
        if (!complete) {
            setMessageAlert({'type': 'danger', 'text': 'No se han completado todos los datos de pago.'})
        } else {
            const card = elements.getElement(CardElement);
            const payload = await stripe.confirmCardPayment(props.order.clientSecret, {payment_method: {card}});

            if ('paymentIntent' in payload
                && 'status' in payload.paymentIntent
                && payload.paymentIntent.status === 'succeeded'
            ) {
                Promise.all([
                    notifyPaymentOrder(payload.paymentIntent.id)
                ]).then(response => {
                    const data = response.length > 0 ? response[0] : [];

                    if(data.result){
                        setMessageAlert({
                            'type': 'success',
                            'text': '¡El pago se ha realizado con éxito! Puedes ver tu pedido en la página de ' +
                                'perfil. Estamos redirigiéndote a la página de Perfil...'
                        });
                        setPaid(true);
                        setPaying(false);
                        setTimeout(() => {
                            document.location.href = '/perfil?tab=3';
                        }, 2000);
                    } else {
                        setMessageAlert({
                            'type': 'warning',
                            'text': 'El pago se ha realizado con éxito. Sin embargo no se ha notificado ' +
                                'correctamente. Por favor, ponte en contacto con nosotros mediante vía telefónica.'
                        });
                        setPaying(false);
                    }
                }).catch(error => {
                    console.log('Error en la notificación de pago del pedido: ' + error);
                    setMessageAlert({
                        'type': 'warning',
                        'text': 'El pago se ha realizado con éxito. Sin embargo no se ha notificado correctamente. ' +
                            'Por favor, ponte en contacto con nosotros mediante vía telefónica.'
                    });
                    setPaying(false);
                });
                localStorage.setItem(localStorageKeyProducts, JSON.stringify([]));
            } else if ('error' in payload) {
                setMessageAlert({'type': 'danger', 'text': payload.error.message});
                setPaying(false);
            }
        }
    };

    const onChangeInCardElement = (e) => {
        setMessageAlert(undefined);
        if (e.error !== undefined) {
            setMessageAlert({'type': 'danger', 'text': e.error.message})
        } else {
            setComplete(e.complete);
        }
    };

    return (
        <form id="payment-form" className="payment-form" onSubmit={(e) => onSubmitPayment(e)}>
            {messageAlert !== undefined &&
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Alert key={messageAlert.type} variant={messageAlert.type}
                       onClose={() => setMessageAlert(undefined)} dismissible>
                    <strong>{messageAlert.text}</strong>
                </Alert>
            </motion.div>
            }
            {!paid &&
            <>
                <Box mb={2}><CardElement id="card-element" onChange={onChangeInCardElement}/></Box>
                {paying ?
                    <div className="login-loader"><div className="lds-dual-ring"/></div> :
                    <button className="btn btn-payment-process custom-btn" type="submit">Pagar</button>
                }
            </>
            }
        </form>
    );
}

export default PaymentForm;