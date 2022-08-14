import React, {useState} from 'react';

import './css/profile-tab-panel.scss';

function ProfileTabPanel(props) {
    const {id, email, name, phoneNumber, surname} = props.profileData;

    const [emailS, setEmailS] = useState(email);
    const [nameS, setNameS] = useState(name);
    const [surnameS, setSurnameS] = useState(surname);
    const [phoneNumberS, setPhoneNumberS] = useState(phoneNumber);
    const [password, setPassword] = useState('');
    const [passwordCompare, setPasswordCompare] = useState('');
    const [message, setMessage] = useState(undefined);

    const submitUpdateForm = (e) => {
        e.preventDefault();

        setMessage(undefined);
        if (password !== passwordCompare) {
            setMessage({
                'message': 'Las contraseñas no coincide. Por favor inténtalo de nuevo.',
                'type': 'text-danger',
            })
        }
        console.log(password);
        console.log(passwordCompare);
    };

    return (
        <>
            <section className="profile-tab-header">
                <h4>Datos personales</h4>
                <p>Puedes actualizar tus datos personales aquí cada vez que lo necesites.</p>
            </section>
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
                {message !== undefined && <span className={message.type + " mt-2 fw-bold"}>{message.message}</span>}
                <input type="hidden" name="id" value={id}/>
                <input className="btn btn-profile custom-btn" type="submit" name="" value="Actualizar"/>
            </form>
        </>
    );
}

export default ProfileTabPanel;
