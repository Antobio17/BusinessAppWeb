import React, {useState} from 'react';
import {motion} from "framer-motion";
import Alert from "react-bootstrap/Alert";

import './css/profile-tab-panel.scss';

import {updateUserData} from "../../services/user";
import {pageTransition, pageVariants} from "../../App";


function ProfileTabPanel(props) {
    const {id, email, name, phoneNumber, surname} = props.profileData;

    const [updating, setUpdating] = useState(false);
    const [emailS, setEmailS] = useState(email);
    const [nameS, setNameS] = useState(name);
    const [surnameS, setSurnameS] = useState(surname);
    const [phoneNumberS, setPhoneNumberS] = useState(phoneNumber);
    const [password, setPassword] = useState('');
    const [passwordCompare, setPasswordCompare] = useState('');
    const [messageAlert, setMessageAlert] = useState(undefined);

    const submitUpdateForm = (e) => {
        e.preventDefault();

        setUpdating(true);
        setMessageAlert(undefined);

        if (password.length > 0 && password.length < 8) {
            setMessageAlert({'type': 'warning', 'message': 'Las contraseña debe tener mínimo 8 caracteres.'});
            setUpdating(false);
        } else if (password !== passwordCompare) {
            setMessageAlert({'type': 'danger', 'message': 'Las contraseñas no coincide. Inténtalo de nuevo.'});
            setUpdating(false);
        } else {
            Promise.all([
                updateUserData(emailS, nameS, surnameS, phoneNumberS, password)
            ]).then(response => {
                const data = response.length > 0 ? response[0] : [];

                if (data.data && data.code === 202) {
                    setMessageAlert({'type': 'success', 'message': 'Has actualizado tu perfil con éxito.'})
                } else if (data.code === 61) {
                    setMessageAlert({'type': 'danger', 'message': 'El email introducido ya existe.'})
                } else {
                    setMessageAlert({'type': 'danger', 'message': 'Ha ocurrido un error. Inténtalo de nuevo.'})
                }
                setUpdating(false);
            }).catch(error => {
                console.log('Error al actualizar los datos de usuario: ' + error);
                setMessageAlert({'type': 'danger', 'message': 'Ha ocurrido un error. Inténtalo de nuevo.'})
                setUpdating(false);
            });
        }
    };

    return (
        <>
            <section className="profile-tab-header">
                <h4>Datos personales</h4>
                <p>Puedes actualizar tus datos personales aquí cada vez que lo necesites.</p>
            </section>
            {messageAlert !== undefined &&
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Alert key={messageAlert.type} variant={messageAlert.type} className="text-center m-0"
                       onClose={() => setMessageAlert(undefined)} dismissible>
                    <strong>{messageAlert.message}</strong>
                </Alert>
            </motion.div>
            }
            <form onSubmit={(e) => submitUpdateForm(e)} className="profile-data-form row">
                <div className="col-12 col-md-6">
                    <input type="text" name="email" placeholder="Email..." value={emailS}
                           onChange={(e) => setEmailS(e.target.value)} required/>
                    <input type="password" name="password" placeholder="Contraseña..."
                           onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" name="password-compare" placeholder="Repite la contraseña..."
                           onChange={(e) => setPasswordCompare(e.target.value)}/>
                </div>
                <div className="col-12 col-md-6">
                    <input type="text" name="name" placeholder="Nombre..." value={nameS}
                           onChange={(e) => setNameS(e.target.value)} required/>
                    <input type="text" name="surname" placeholder="Apellidos..." value={surnameS}
                           onChange={(e) => setSurnameS(e.target.value)} required/>
                    <input type="text" name="phoneNumber" placeholder="Teléfono..." value={phoneNumberS}
                           onChange={(e) => setPhoneNumberS(e.target.value)} required/>
                </div>
                <input type="hidden" name="id" value={id}/>
                {updating ?
                    <div className="login-loader">
                        <div className="lds-dual-ring"/>
                    </div> :
                    <input className="btn btn-profile custom-btn" type="submit" name="" value="Actualizar"/>
                }
            </form>
        </>
    );
}

export default ProfileTabPanel;
