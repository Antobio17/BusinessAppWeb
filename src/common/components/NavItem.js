import {Link} from "react-router-dom";
import React from "react";

function NavItem(props) {
    return (
        <li className='nav-item'>
            <Link to={props.to} className='nav-links'>
                {props.iconLabel}
                <div className="navbar-labels">
                    {props.label}
                </div>
            </Link>
        </li>
    );
}

export default NavItem;