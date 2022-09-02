import React from "react";

function ProfileDataForm(props) {
    return (
        <form onSubmit={(e) => props.submitForm(e)} className="profile-data-form row">
            <div className="col-12 col-md-6">
                <input type="text" name="email" placeholder="Email..." value={props.email}
                       onChange={(e) => props.setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="Contraseña..."
                       onChange={(e) => props.setPassword(e.target.value)}/>
                <input type="password" name="password-compare" placeholder="Repite la contraseña..."
                       onChange={(e) => props.setPasswordCompare(e.target.value)}/>
            </div>
            <div className="col-12 col-md-6">
                <input type="text" name="name" placeholder="Nombre..." value={props.name}
                       onChange={(e) => props.setName(e.target.value)} required/>
                <input type="text" name="surname" placeholder="Apellidos..." value={props.surname}
                       onChange={(e) => props.setSurname(e.target.value)} required/>
                <input type="text" name="phoneNumber" placeholder="Teléfono..." value={props.phoneNumber}
                       onChange={(e) => props.setPhoneNumber(e.target.value)} required/>
            </div>
            {props.id !== undefined && <input type="hidden" name="id" value={props.id}/>}
            {props.updating ?
                <div className="login-loader">
                    <div className="lds-dual-ring"/>
                </div> :
                <input className="btn btn-profile custom-btn" type="submit" name="" value={props.btnLabel}/>
            }
        </form>
    );
}

export default ProfileDataForm;