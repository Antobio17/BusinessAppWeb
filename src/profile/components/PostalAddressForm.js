import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";

import './css/postal-address-form.scss';

function PostalAddressForm(props) {
    return (
        <form onSubmit={(e) => {
            props.onSubmit(e)
        }} className="postal-address-form row">
            <div className="col-12 col-md-6">
                <input type="text" name="name" placeholder="Nombre..." value={props.name}
                       onChange={(e) => props.setName(e.target.value)} required/>
                <input type="text" name="address" placeholder="Dirección..." value={props.address}
                       onChange={(e) => props.setAddress(e.target.value)} required/>
                <input type="text" name="neighborhood" placeholder="Barrio... (Opcional)" value={props.neighborhood}
                       onChange={(e) => props.setNeighborhood(e.target.value)}/>
                <input type="number" name="name" placeholder="Código Postal..." value={props.postalCode}
                       onChange={(e) => props.setPostalCode(e.target.value)} required/>
            </div>
            <div className="col-12 col-md-6">
                <input type="text" name="population" placeholder="Población..." value={props.population}
                       onChange={(e) => props.setPopulation(e.target.value)} required/>
                <input type="text" name="province" placeholder="Provincia..." value={props.province}
                       onChange={(e) => props.setProvince(e.target.value)} required/>
                <input type="text" name="state" placeholder="País..." value={props.state}
                       onChange={(e) => props.setState(e.target.value)} required/>
                {props.selectedID !== undefined && <input type="hidden" name="id" value={props.selectedID}/>}
                {props.updating ?
                    <div className="login-loader">
                        <div className="lds-dual-ring"/>
                    </div> :
                    <div>
                        <input className="btn btn-profile custom-btn" type="submit" name="submit"
                               value={props.btnLabel}/>
                        {props.selectedID !== undefined &&
                        <button className="btn btn-profile custom-btn btn-delete"
                                onClick={(e) => {
                                    props.onDelete(e, props.selectedID)
                                }}>
                            <DeleteIcon/>
                        </button>
                        }
                    </div>
                }
            </div>
        </form>
    );
}

export default PostalAddressForm;