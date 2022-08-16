import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

import './css/appointment-tab-panel.scss'

import Loading from "../../common/components/Loading";

import {getUserAppointments} from "../../services/appointment";
import Appointment, {statusPending} from "./Appointment";
import {pageTransition, pageVariants} from "../../App";
import ReactPaginate from "react-paginate";

function AppointmentTabPanel(props) {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState(undefined);

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

        setLoading(appointments === undefined)
    }, [appointments, page]);

    return (
        <>
            <section className="profile-tab-header">
                <h4>Tus citas</h4>
                <p>Puedes ver tu historial de citas aquí.</p>
            </section>
            <section className="pending-appointment">
                {props.pendingAppointment === null ?
                    <h6 className="fw-bold text-center m-3">
                        No tienes ninguna cita pendiente ¡realiza tus reservas cuando lo desees!
                    </h6> :
                    <Appointment appointment={props.pendingAppointment}/>
                }
            </section>
            <section className="appointment-list text-center">
                <h5>Historial de citas</h5>
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        {appointments.length === 0 ?
                            <h6 className="fw-bold text-center m-3">
                                Aún no has reservado ninguna cita.
                            </h6> :
                            <>
                                {renderAppointments()}
                                <ReactPaginate
                                    previousLabel={"Anterior"} nextLabel={"Siguiente"}
                                    pageCount={Math.ceil(appointments.length / limit)}
                                    onPageChange={onChangePage} containerClassName={"appointments-pagination"}
                                    disabledClassName={"pagination-disabled-button"} activeClassName={"pagination-active"}
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