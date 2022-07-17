import React from "react";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import LocalMallTwoToneIcon from "@material-ui/icons/LocalMallTwoTone";
import TodayTwoToneIcon from "@material-ui/icons/TodayTwoTone";
import {List} from "@material-ui/core";

import NavItem from './NavItem';
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import Button from "./Button";

function NavMenu(props) {
    return (
        <List className='nav-menu'>
            <NavItem to={'/'} iconLabel={<HomeTwoToneIcon/>} label={'Inicio'}/>
            <NavItem to={'/tienda'} iconLabel={<LocalMallTwoToneIcon/>} label={'Tienda'}/>
            {props.isLoggedIn ?
                <>
                    <NavItem to={'/citas'} iconLabel={<TodayTwoToneIcon/>} label={'Citas'}/>
                    <NavItem to={'/perfil'} iconLabel={<AccountCircleTwoToneIcon/>} label={'Mi perfil'}/>
                    <Button to={'/logout'} label={'Cerrar Sesión'}/>
                </> :
                <Button to={'/login'} label={'Iniciar Sesión'}/>
            }
        </List>
    );
}

export default NavMenu;