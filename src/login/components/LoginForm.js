import {Link} from "react-router-dom";
import React from "react";

import "../css/login-form.scss"

function LoginForm(props) {
    return (
        <form onSubmit={(e) => props.submitLoginForm(e)} className="login-form">
            <input type="text" name="email" placeholder="Email"
                   onChange={(e) => props.setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="Contraseña"
                   onChange={(e) => props.setPassword(e.target.value)}/>
            {props.message !== undefined && <span className="mb-2 fw-bold text-danger">{props.message}</span>}
            <a className="forgot-href" href="#">¿Has olvidado tu contraseña?</a>
            {props.checking ?
                <div className="login-loader">
                    <div className="lds-dual-ring"/>
                </div> :
                <input className="btn btn-login custom-btn" type="submit" name="" value="Iniciar sesión"/>
            }
            <div className="col-md-12 mt-4">
                <Link className="signup-href fw-bold" to="/signup">¿Es tu primera vez? Regístrate</Link>
            </div>
        </form>
    );
}

export default LoginForm;