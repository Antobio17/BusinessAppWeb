import React, {useState} from 'react';
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from '@material-ui/icons/Create';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Collapse} from "react-bootstrap";
import {motion} from "framer-motion";

import './css/postal-address-tap-panel.scss';

import PostalAddressForm from "./PostalAddressForm";

import {setPostalAddress} from "../../services/user";
import {pageTransition, pageVariants} from "../../App";
import Alert from "react-bootstrap/Alert";

function PostalAddressTabPanel(props) {
    const maxAddresses = 5;

    const [updating, setUpdating] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [population, setPopulation] = useState('');
    const [province, setProvince] = useState('');
    const [state, setState] = useState('');
    const [btnLabel, setBtnLabel] = useState('Crear');
    const [selectedID, setSelectedID] = useState(undefined);
    const [messageAlert, setMessageAlert] = useState(undefined);

    const onSubmit = (e) => {
        e.preventDefault();

        setUpdating(true);
        Promise.all([
            setPostalAddress(selectedID, name, address, postalCode, population, province, state)
        ]).then(response => {
            const data = response.length > 0 ? response[0] : [];

            if (data) {
                setMessageAlert({
                    'type': 'success',
                    'message': 'Has ' + (selectedID !== undefined ? 'actualizado' : 'creado') +
                        ' la dirección correctamente.',
                });
            } else {
                setMessageAlert({'type': 'danger', 'message': 'Ha ocurrido un error. Inténtalo de nuevo.'});
            }
            setUpdating(false);
        }).catch(error => {
            console.log('Error al establecer la dirección postal: ' + error);
            setMessageAlert({'type': 'danger', 'message': 'Ha ocurrido un error. Inténtalo de nuevo.'});
            setUpdating(false);
        });
    };

    const renderPostalAddresses = () => {
        let render = [];

        Object.entries(props.postalAddresses).forEach(([key, postalAddress]) => {
            render.push(
                <article key={key} className="postal-address-item">
                    <p className="fw-bold">{postalAddress.name}</p>
                    <button className="btn btn-profile custom-btn" onClick={() => {
                        setOpen(true);
                        setBtnLabel('Editar');
                        // Setting form values
                        setSelectedID(key);
                        setName(postalAddress.name);
                        setAddress(postalAddress.address);
                        setPostalCode(postalAddress.postalCode);
                        setPopulation(postalAddress.population);
                        setProvince(postalAddress.province);
                        setState(postalAddress.state);
                    }}>
                        <CreateIcon/>
                    </button>
                </article>
            );
        });

        return render;
    }

    return (
        <>
            <section className="profile-tab-header">
                <h4>Direcciones de envío</h4>
                <p>
                    Puedes ver todas tus direcciones de envío desde aquí. Además podrás crear nuevas y editar
                    las existentes.
                </p>
            </section>
            <section className="postal-address-new text-center">
                {messageAlert !== undefined &&
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                            transition={pageTransition}>
                    <Alert key={messageAlert.type} variant={messageAlert.type} className="text-center m-2"
                           onClose={() => setMessageAlert(undefined)} dismissible>
                        <strong>{messageAlert.message}</strong>
                    </Alert>
                </motion.div>
                }
                {maxAddresses > Object.keys(props.postalAddresses).length &&
                <button className="btn btn-profile custom-btn" onClick={() => {
                    setOpen(true);
                    setBtnLabel('Crear');
                    setSelectedID(undefined);
                    setName('');
                    setAddress('');
                    setPostalCode('');
                    setPopulation('');
                    setProvince('');
                    setState('');
                }}>
                    Nueva <HomeIcon/>
                </button>
                }
                <Collapse in={open}>
                    <div>
                        <PostalAddressForm name={name} setName={setName} address={address} setAddress={setAddress}
                                           neighborhood={neighborhood} setNeighborhood={setNeighborhood}
                                           postalCode={postalCode} setPostalCode={setPostalCode} updating={updating}
                                           population={population} setPopulation={setPopulation} btnLabel={btnLabel}
                                           province={province} setProvince={setProvince} state={state}
                                           setState={setState} selectedID={selectedID} onSubmit={onSubmit}/>
                        <KeyboardArrowUpIcon className="close-icon" onClick={() => {
                            setOpen(false)
                        }}/>
                    </div>
                </Collapse>
            </section>
            <section className="postal-address-list text-center">
                <h5>Tus direcciones</h5>
                {Object.keys(props.postalAddresses).length === 0 ?
                    <span className="fw-bold">Aún no has añadido ninguna dirección</span> :
                    <>{renderPostalAddresses()}</>
                }
            </section>
        </>
    );
}

export default PostalAddressTabPanel;
