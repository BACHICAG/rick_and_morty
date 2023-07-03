import React, {useState} from "react";
import style from './SearchBar.module.css';
import plus from "../../imagenes/plus-solid.svg"
import random from "../../imagenes/Random.svg"

export default function SearchBar(props){

  const [id, setId] = useState("");

  const handleChange = (event) =>{
    setId(event.target.value);
  };

  return (
    <div className={style.div}>
      <input
        className={style.input}
        type="text"
        placeholder="Busca un personaje..."
        onChange={handleChange}
        value={id}
      />
      <button
        className={style.button}
        title="Agregar"
        onClick={() => {props.onSearch(id);}}>
          <img className={style.svg} src={plus} alt="Agregar"/>
      </button>
      <button
        className={style.button}
        title="Random"
        onClick={props.addRandomCharacter}>
        <img className={style.svg} src={random} alt="random"/>
      </button>
    </div>
  );
}
