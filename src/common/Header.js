import React from 'react';

import './css/header.css';

import NavBar from "./components/NavBar";

function Header(props) {
    return (
        <>
            <header className="header">
                <NavBar isLoggedIn={props.isLoggedIn}/>
            </header>
        </>
    );
}

export default Header;