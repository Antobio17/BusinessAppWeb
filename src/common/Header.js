import React from 'react';

import './css/header.css';

import NavBar from "./components/NavBar";

function Header() {
    return (
        <>
            <header className="header">
                <NavBar/>
            </header>
        </>
    );
}

export default Header;