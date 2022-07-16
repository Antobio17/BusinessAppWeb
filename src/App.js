// noinspection ES6CheckImport
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {AnimatePresence} from 'framer-motion';

import Footer from './common/Footer';

import './App.css';

export const webDomain = (window.location.hostname).replace('www.', '');
export const webServiceURL = process.env.REACT_APP_BUSINESS_APP_WS_URL;
export const pageVariants = {
    initial: {opacity: 0, x: "-100vw", scale: 0.8},
    in: {opacity: 1, x: 0, scale: 1},
    out: {opacity: 0, x: "100vw", scale: 1.2}
};
export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

function App() {
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                <Router>
                    <Routes>

                    </Routes>
                </Router>
            </AnimatePresence>
            <Footer/>
        </>
    );
}

export default App;
