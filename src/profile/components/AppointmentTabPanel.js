import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import ReactPaginate from 'react-paginate';
import Alert from 'react-bootstrap/Alert';

import './css/appointment-tab-panel.scss'

import Loading from '../../common/components/Loading';

import {getUserAppointments, statusPending} from '../../services/appointment';
import Appointment from './Appointment';
import {pageTransition, pageVariants} from '../../App';

function AppointmentTabPanel(props) {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState(undefined);
    const [bookingCancelled, setBookingCancelled] = useState(false);
    const [messageAlert, setMessageAlert] = useState(undefined);

    // Appointments Pagination
    const [page, setPage] = useState(0);
    const limit = 6;
    const offset = page * limit;
    const displayItems = appointments !== undefined ? appointments.slice(offset, offset + limit) : undefined;
    const onChangePage = ({selected}) => {
        setPage(selected);
    }

    const renderAppointments = () => {
        let render = [];

        displayItems.forEach(appointment => {
            if (appointment.status !== statusPending) {
                render.push(<Appointment key={appointment.id} appointment={appointment}/>);
            }
        });

        return render;
    };

    const onBookingCancelled = (result) => {
        if (result) {
            props.setPendingAppointment(null);
            setAppointments(undefined);
            setLoading(false);
            setMessageAlert({
                'type': 'success',
                'message': 'Has cancelado tu cita con éxito.',
            });
        } else {
            setMessageAlert({
                'type': 'danger',
                'message': 'Ha ocurrido un error al intentar cancelar la cita.',
            });
        }
        setBookingCancelled(result);
    };

    useEffect(() => {
        if (appointments === undefined) {
            Promise.all([
                getUserAppointments()
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];
                setAppointments(data);
            }).catch(error => {
                console.log('Error al recuperar la recuperación de citas del cliente: ' + error);
            });
        }

        setLoading(appointments === undefined);
    }, [loading, appointments, page, bookingCancelled]);

    return (
        <>
            <section className="profile-tab-header">
                <h4>Tus citas</h4>
                <p>Puedes ver tu historial de citas junto a su estado aquí.</p>
            </section>
            <section className="pending-appointment">
                {messageAlert !== undefined &&
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                            transition={pageTransition}>
                    <Alert key={messageAlert.type} variant={messageAlert.type} className="text-center m-2"
                           onClose={() => setMessageAlert(undefined)} dismissible>
                        <strong>{messageAlert.message}</strong>
                    </Alert>
                </motion.div>
                }
                {props.pendingAppointment === null ?
                    <h6 className="fw-bold text-center m-3">
                        No tienes ninguna cita pendiente ¡realiza tus reservas cuando lo desees!
                    </h6> :
                    <Appointment appointment={props.pendingAppointment} userEmail={props.userEmail}
                                 onBookingCancelled={onBookingCancelled}/>
                }
            </section>
            <section className="appointment-list text-center">
                <h5>Historial de citas</h5>
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        {appointments === undefined || appointments.length === 0 ||
                        (appointments.length === 1 && appointments[0].status === 0) ?
                            <h6 className="fw-bold text-center m-3">
                                Tu historial de citas está vacío.
                            </h6> :
                            <>
                                {renderAppointments()}
                                <ReactPaginate
                                    previousLabel={"Anterior"} nextLabel={"Siguiente"}
                                    pageCount={Math.ceil(appointments.length / limit)}
                                    onPageChange={onChangePage} containerClassName={"appointments-pagination"}
                                    disabledClassName={"pagination-disabled-button"}
                                    activeClassName={"pagination-active"}
                                    previousLinkClassName={"pagination-previous-button"}
                                    nextLinkClassName={"pagination-next-button"}
                                />
                            </>
                        }
                    </motion.div>
                )}
            </section>
        </>
    );
}

export default AppointmentTabPanel;