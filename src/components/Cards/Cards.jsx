import React, { useEffect, useRef } from 'react';
import Card from './Card.jsx';
import style from "./Cards.module.css";
import video from "../../imagenes/Space.mp4"
// import sound from "../../imagenes/sound-metroid-fusion.mp3"

export default function Cards(props) {
  const { characters, onClose } = props;
  // const audioRef = useRef(null);

  // useEffect(() => {
  //   // Reproducir el sonido al montar el componente Home
  //   audioRef.current.play();

  //   return () => {
  //     // Pausar el sonido al desmontar el componente Home
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   };
  // }, []);
  
  return (
    <div className={style.contenedor_padre}>
      <div className={style.videoContainer}>
        <video src={video} type="video/mp4" className={style.video} autoPlay loop muted/>
      </div>

      {/* <audio src={sound} type="audio/mp3" ref={audioRef}/> */}

      {characters.map((character) => (
        <Card
          key={character.id}
          id = {character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin}
          image={character.image}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
