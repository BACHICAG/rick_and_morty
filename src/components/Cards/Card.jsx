import React, { useState } from 'react';
import style1 from './Card.module.css';
import { Link } from "react-router-dom";

export default function Card(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleClose = () => {
    props.onClose(props.id);
  };

  return (
    // Contenedor de la carta
    <div className={`${style1.contenedor_carta} ${clicked ? style1.clicked : ''}`} onClick={handleClick}>

      {/* Botón */}
      <button className={style1.button} onClick={handleClose}>X</button>

      {/* Imagen del personaje */}
      <img className={`${style1.img} ${clicked ? style1.clicked : ''}`} src={props.image} alt={props.name}/>

      {/* Nombre del personaje */}
      <div className={`${style1.contenedor_nombre} ${clicked ? style1.clicked : ''}`}>
        <h2 className={`${style1.h2} ${clicked ? style1.clicked : ''}`}> {props.name} </h2>
      </div>
      
      {/* Agregamos un condicional para que aparesca el texto con la información restante */}
      { clicked && <p className={style1.p}>
                      Species: {props.species} <br></br>    {/*Especie del personaje*/}
                      <hr className={style1.hr}></hr>
                      Gender: {props.gender} <br></br>      {/*Género del personaje*/}
                      <hr className={style1.hr}></hr>
                      Status: {props.status} <br></br>      {/*Estado del personaje (Vivo o muerto)*/}
                      <hr className={style1.hr}></hr>
                      Origin: {props.origin.name} <br></br> {/*Origen del personaje*/}
                      <hr className={style1.hr}></hr>
                      <Link to={`/detail/${props.id}`} className={style1.Link}>More</Link>
                    </p>
      }
    </div>
  );
}
