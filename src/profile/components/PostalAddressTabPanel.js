import React, {useEffect, useState} from 'react';
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from '@material-ui/icons/Create';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Collapse} from "react-bootstrap";

import './css/postal-address-tap-panel.scss';

import PostalAddressForm from "./PostalAddressForm";

function PostalAddressTabPanel(props) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [population, setPopulation] = useState('');
    const [province, setProvince] = useState('');
    const [state, setState] = useState('');
    const [btnLabel, setBtnLabel] = useState('Crear');
    const [postalAddresses, setPostalAddresses] = useState([]);

    const renderPostalAddresses = () => {
        let render = [];

        Object.entries(postalAddresses).forEach(([key, postalAddresses]) => {
            render.push(
                <article key={key} className="postal-address-item">
                    <p className="fw-bold">{postalAddresses.name}</p>
                    <button className="btn btn-profile custom-btn" onClick={() => {
                        setOpen(true);
                        setBtnLabel('Editar');
                    }}>
                        <CreateIcon/>
                    </button>
                </article>
            );
        });

        return render;
    }

    useEffect(() => {
        let addresses = [];
        // noinspection JSUnusedLocalSymbols
        Object.entries(props.postalAddresses).forEach(([key, pAddresses]) => {
            addresses.push(pAddresses)
        });
        setPostalAddresses(addresses);
    }, []);

    return (
        <>
            <section className="profile-tab-header">
                <h4>Direcciones de envío</h4>
                <p>
                    Puedes ver todas tus direcciones de envío desde aquí. Además podrás crear nuevas y editar
                    las existentes
                </p>
            </section>
            <section className="postal-address-new text-center">
                <button className="btn btn-profile custom-btn" onClick={() => {
                    setOpen(true);
                    setBtnLabel('Crear');
                }}>
                    Nueva <HomeIcon/>
                </button>
                <Collapse in={open}>
                    <div>
                        <PostalAddressForm name={name} setName={setName} address={address} setAddress={setAddress}
                                           neighborhood={neighborhood} setNeighborhood={setNeighborhood}
                                           postalCode={postalCode} setPostalCode={setPostalCode}
                                           population={population} setPopulation={setPopulation} btnLabel={btnLabel}
                                           province={province} setProvince={setProvince} state={state}
                                           setState={setState}/>
                        <KeyboardArrowUpIcon className="close-icon" onClick={() => {
                            setOpen(false)
                        }}/>
                    </div>
                </Collapse>
            </section>
            <section className="postal-address-list text-center">
                <h5>Tus direcciones</h5>
                {postalAddresses.length === 0 ?
                    <span className="fw-bold">Aún no has añadido ninguna dirección</span> :
                    <>{renderPostalAddresses()}</>
                }
            </section>
        </>
    );
}

export default PostalAddressTabPanel;