// noinspection JSUnresolvedFunction
import React from 'react';

import './css/instagram-image-box.scss';

function InstagramImageBox(props) {

    return (
        <div className="col-12 col-md-4 col-lg-4 instagram-image-box">
            <img src={props.src} alt={props.alt} width={props.width} height={props.height}/>
        </div>
    );
}

export default InstagramImageBox;