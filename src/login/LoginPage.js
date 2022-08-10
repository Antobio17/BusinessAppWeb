import {motion} from "framer-motion";
import {pageTransition, pageVariants} from "../App";
import React, {useState} from "react";

import "./css/login-page.scss";
import "../common/components/css/loader-ring.scss";
import {login, isLoggedIn} from "../services/login";
import LoginForm from "./components/LoginForm";

function LoginPage() {
    const [checking, setChecking] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState(undefined);

    const submitLoginForm = (e) => {
        e.preventDefault();
        setChecking(true);

        Promise.all([
            login(email, password)
        ]).then(response => {
            if (response.length > 0) {
                const data = response[0];
                if (data.code === 200) {
                    if (isLoggedIn()) {
                        document.location.href = '/';
                    } else {
                        setMessage(
                            "Las cookies de sesión no han podido ser establecidas. Revisa la configuración" +
                            "de tu navegador para resolver el problema e iniciar sesión."
                        );
                    }
                } else {
                    setMessage(data.message);
                }
            }
            setChecking(false);
        }).catch(error => console.log(error));
    };

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main login">
                <section className="login-intro">
                    <h1>Iniciar Sesión</h1>
                    <p>
                        Inicia sesión para acceder a las reservas de citas, compra de productos y muchas más ventajas
                        ¡Descúbrelas con nosotros!
                    </p>
                </section>
                <section className="login-form-section">
                    <LoginForm submitLoginForm={submitLoginForm} setEmail={setEmail} setPassword={setPassword}
                               message={message} checking={checking}/>
                </section>
            </main>
        </motion.div>
    );
}

export default LoginPage;