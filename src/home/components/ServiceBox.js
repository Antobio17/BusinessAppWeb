import React from 'react';

import './css/service-box.scss';

function ServiceBox(props) {

    return (
        <div className="col-12 col-lg-4 p-3">
            <div className="col-12 service-box">
                <section>
                    <img src={props.imageSrc} alt={props.alt} width={props.width} height={props.height}/>
                </section>
                <section className="service-box-title">
                    <span>{props.title}</span>
                </section>
                <section className="service-box-description">
                    <span>{props.description}</span>
                </section>
            </div>
        </div>
    );
}

export default ServiceBox;