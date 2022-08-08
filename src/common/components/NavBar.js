import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import './css/navbar.scss';

import NavMenu from './NavMenu';
import {businessName} from "../../App";

const useStyles = makeStyles({list: {width: 250}, fullList: {width: 'auto'}});

function NavBar(props) {
    const [click, setClick] = useState(false);

    const logoSrc = process.env.REACT_APP_CONFIG_WEBSITE_BUSINESS_LOGO_SRC;

    const handleClick = () => setClick(!click);

    const classes = useStyles();
    const [anchor] = useState('left')
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        handleClick();
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <NavMenu isLoggedIn={props.isLoggedIn}/>
        </div>
    );

    return (
        <>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    {logoSrc !== undefined ?
                        <img src={logoSrc} alt="Logo" title="Logo" width="73px" height="70px"/> :
                        <>{businessName}</>
                    }
                </Link>
                <div className="menu-icon" onClick={toggleDrawer(anchor, true)}>
                    <i className={"text-white " + (click ? "fas fa-times" : "fas fa-bars")}/>
                </div>
                <NavMenu isLoggedIn={props.isLoggedIn}/>
            </nav>
        </>
    );
}

export default NavBar;