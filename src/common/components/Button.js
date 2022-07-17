import React from 'react';
import {Link} from 'react-router-dom';

import './css/button.scss';

function Button(props) {
    return (
        <Link to={props.to} className='custom-btn'>
            <div className="justify-content-center align-items-center d-flex">
                {props.iconLabel ?? null}
                <span>{props.label}</span>
            </div>
        </Link>
    );
}

export default Button;