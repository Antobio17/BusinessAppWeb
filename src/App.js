// noinspection ES6CheckImport
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState} from "react";
import {AnimatePresence} from 'framer-motion';

import Header from './common/Header';
import HomePage from './home/HomePage';
import StorePage from './store/StorePage';
import LoginPage from './login/LoginPage';
import Footer from './common/Footer';

import {isLoggedIn as isLoggedInFunct} from "./services/login";

import './App.css';


export const webDomain = (window.location.hostname).replace('www.', '');
export const webServiceURL = process.env.REACT_APP_BUSINESS_APP_WS_URL;
export const businessName = process.env.REACT_APP_CONFIG_WEBSITE_BUSINESS_NAME;

export const pageVariants = {
    initial: {opacity: 0, x: "-100vw", scale: 0.8},
    in: {opacity: 1, x: 0, scale: 1},
    out: {opacity: 0, x: "100vw", scale: 1.2}
};
export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
};

function App() {
    const [isLoggedIn] = useState(isLoggedInFunct());

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                <Router>
                    <Header isLoggedIn={isLoggedIn}/>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/tienda" element={<StorePage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                    </Routes>
                </Router>
            </AnimatePresence>
            <Footer/>
        </>
    );
}

export default App;
