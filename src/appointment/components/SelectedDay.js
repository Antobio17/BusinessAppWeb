import {Modal} from 'react-bootstrap';
import React, {useEffect} from 'react';
import TodayIcon from '@material-ui/icons/Today';

import './css/selected-day.scss';
import Hour from './Hour';

import {incrementHour, isGreaterThan} from '../../services/tools';

function SelectedDay(props) {
    const hours = props.hours;
    const appointmentDuration = props.appointmentDuration;

    const getRenderHours = () => {
        let render = [], hour;

        // noinspection JSUnusedLocalSymbols
        Object.entries(hours).forEach(([key, value]) => {
            hour = value[0];
            do {
                render.push(<Hour key={hour} hour={hour} available={false}/>);
                hour = incrementHour(hour, appointmentDuration);
            } while (isGreaterThan(value[1], hour));
        });

        return render;
    };

    useEffect(() => {

    }, []);

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} size="lg"
               aria-labelledby="contained-modal-title-vcenter" className="selected-day" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                    <TodayIcon/> {props.selectedDayFormatted}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getRenderHours()}
            </Modal.Body>
        </Modal>
    );
}

export default SelectedDay;