import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import SearchBar from "./SearchBar.jsx"

import home from "../../imagenes/home.svg"
import about from "../../imagenes/about.svg"
import logout from "../../imagenes/logout.svg"
import favorites from "../../imagenes/favorites.svg"
import title from "../../imagenes/title.png"

import style from "./Nav.module.css"


export default function Nav(props){
    const navigate = useNavigate();
    // Obtiene la ruta actual
    const location = useLocation();

    // Verifica si la ruta actual es "/"
    const isHome = location.pathname === "/";

    // Renderiza la barra de navegación solo si la ruta no es "/"
    if (isHome) {
        return null;
    }

    function handleLogout(){
        props.logout();
        navigate("/");
    }

    return(
        <div className={style.containerNav}>

            <img className={style.img} src={title} alt="Rick and Morty title" />
            
            <Link to="/home" title="Home" className={`${style.active} ${style.svg}`}><img src={home} alt="Home" /></Link>
            <Link to="/about" title="About" className={`${style.active} ${style.svg}`}><img src={about} alt="About" /></Link>
            <Link to="/favorites" title="Favoritos" className={`${style.active} ${style.svg}`}><img src={favorites} alt="Favoritos" /></Link>
            
            <SearchBar onSearch={props.onSearch} addRandomCharacter={props.addRandomCharacter}/>
            
            <button title="Logout" className={`${style.active} ${style.svg2} ${style.button}`} onClick={handleLogout}><img src={logout} alt="Logout" /></button>
        </div>
    );
}
