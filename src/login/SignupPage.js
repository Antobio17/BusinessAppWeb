import React, {useState} from "react";
import {motion} from "framer-motion";
import Alert from "react-bootstrap/Alert";

import {pageTransition, pageVariants} from "../App";
import "./css/signup-page.scss";
import "../common/components/css/loader-ring.scss";

import {validatePhoneNumber} from "../services/tools";
import {signup} from "../services/login";

import ProfileDataForm from "../profile/components/ProfileDataForm";

function SignupPage() {
    const [checking, setChecking] = useState(false);
    const [messageAlert, setMessageAlert] = useState(undefined);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCompare, setPasswordCompare] = useState('');

    const submitSignupForm = (e) => {
        e.preventDefault();
        setChecking(true);
        setMessageAlert(undefined);

        if (password.length < 8) {
            setMessageAlert({'type': 'warning', 'text': 'Las contraseña debe tener mínimo 8 caracteres.'});
            setChecking(false);
        } else if (password !== passwordCompare) {
            setMessageAlert({'type': 'danger', 'text': 'Las contraseñas no coincide. Inténtalo de nuevo.'});
            setChecking(false);
        } else if (!validatePhoneNumber(phoneNumber)) {
            setMessageAlert({'type': 'danger', 'text': 'El formato de teléfono no es válido.'});
            setChecking(false);
        } else {
            Promise.all([
                signup(email, name, surname, phoneNumber, password)
            ]).then(response => {
                if (response.length > 0) {
                    const data = response[0];
                    if (data.code === 201) {
                        setMessageAlert({
                            'type': 'success',
                            'text': '¡Te has registrado correctamente! Estamos redirigiéndote a la página de ' +
                                'Inicio de Sesión...'
                        });
                        setTimeout(() => {
                            document.location.href = '/login';
                        }, 2000);
                    } else {
                        setMessageAlert({
                            'type': 'danger',
                            'text': data.message !== undefined ? data.message :
                                'Ha ocurrido un error. Inténtalo de nuevo.'
                        });
                    }
                }
                setChecking(false);
            }).catch(error => console.log(error));
        }
    };

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main signup">
                <section className="signup-intro">
                    <h1>Registrarse</h1>
                    <p>
                        Regístrate como nuevo usuario para acceder a las reservas de citas,
                        compra de productos y muchas más ventajas ¡Descúbrelas con nosotros!
                    </p>
                </section>
                <section className="signup-form-section">
                    {messageAlert !== undefined &&
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition}>
                        <Alert key={messageAlert.type} variant={messageAlert.type}
                               onClose={() => setMessageAlert(undefined)} dismissible>
                            <strong>{messageAlert.text}</strong>
                        </Alert>
                    </motion.div>
                    }
                    <ProfileDataForm submitForm={submitSignupForm} email={email} setEmail={setEmail}
                                     setPassword={setPassword} setPasswordCompare={setPasswordCompare}
                                     name={name} setName={setName} surname={surname} setSurname={setSurname}
                                     phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} updating={checking}
                                     btnLabel={"Registrarse"} id={undefined}/>
                </section>
            </main>
        </motion.div>
    );
}

export default SignupPage;