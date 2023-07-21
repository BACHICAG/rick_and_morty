import React, { useState, useEffect } from 'react';
import { addFav, removeFav } from '../../Redux/Actions.jsx';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import style1 from './Card.module.css';

function Card(props) {
  console.log(props);

  const { id, name,
          status,species,
          gender, origin,
          image, onClose,
          removeFav, addFav,
          myFavorites,
  } = props;

  const [clicked, setClicked] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleClose = () => {
    onClose(id);
  };

  const handleFavorite = () => {
    if(isFav){
      setIsFav(false);
      removeFav(id);
    }
    else{
      setIsFav(true);
      addFav(props);
      // {id,name,status,species,gender,origin,image,onClose}
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
       if (fav.id === id) {
          setIsFav(true);
       }
    });
 }, [myFavorites]);

  return (
    // Contenedor de la carta
    <div className={`${style1.contenedor_carta} ${clicked ? style1.clicked : ''}`} onClick={handleClick}>
      
      {/* Botón de añadir a favoritos */}
      <button className={`${style1.favoriteButton}`} onClick={handleFavorite}>
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* Botón de cerrar la carta */}
      <button className={style1.button} onClick={handleClose}>X</button>

      {/* Imagen del personaje */}
      <img className={`${style1.img} ${clicked ? style1.clicked : ''}`} src={image} alt={name}/>

      {/* Nombre del personaje */}
      <div className={`${style1.contenedor_nombre} ${clicked ? style1.clicked : ''}`}>
        <h2 className={`${style1.h2} ${clicked ? style1.clicked : ''}`}> {name} </h2>
      </div>
      
      {/* Agregamos un condicional para que aparesca el texto con la información restante */}
      { clicked && <p className={style1.p}>
                      Species: {species} <br></br>    {/*Especie del personaje*/}
                      <hr className={style1.hr}></hr>
                      Gender: {gender} <br></br>      {/*Género del personaje*/}
                      <hr className={style1.hr}></hr>
                      Status: {status} <br></br>      {/*Estado del personaje (Vivo o muerto)*/}
                      <hr className={style1.hr}></hr>
                      Origin: {origin.name} <br></br> {/*Origen del personaje*/}
                      <hr className={style1.hr}></hr>
                      <Link to={`/detail/${id}`} className={style1.Link}>More</Link>
                    </p>
      }
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return{
    addFav: (character) => {dispatch(addFav(character))},
    removeFav: (id) => {dispatch(removeFav(id))}
  }
};

const mapStateToProps = (state) => {
  return{
    myFavorites: state.myFavorites
  }
};

export default connect(mapStateToProps, mapDispatchToProps,)(Card);