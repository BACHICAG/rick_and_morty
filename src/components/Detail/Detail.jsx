import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import axios from "axios";

export default function Detail() {
  const {id} = useParams();

  const [character,setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then(({ data }) => {
       if (data.name) {
          setCharacter(data);
       } else {
          window.alert('No hay personajes con ese ID');
       }
    });
    return setCharacter({});
  }, [id]);

  return(
    <div className={style.contenedor}>

      {character && (
        <div className={style.contenedor}>
          
          <div className={style.rightSection}>
            <h1 className={style.h1}>{character.name && character.name}</h1>
            <p className={style.p}>
              Species: {character.species ? character.species : "Unknown"} <br/><br/>
              Gender: {character.gender ? character.gender : "Unknown"} <br/><br/>
              Status: {character.status ? character.status : "Unknown"} <br/><br/>
              Origin: {character.origin ? character.origin.name : "Unknown"}
            </p>
          </div>

          <div className={style.leftSection}>
            <img className={style.img} src={character.image} alt={character.name} title={character.name} />
          </div>

          <div className={style.verticalLine}></div>
        </div>
      )}
    </div>
  );
}
