import React, {useState, useEffect} from 'react';             //biblioteca utilizada para construir interfaces de usuario interactivas y reactivas.
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";   //Utilizado para poder utilizar Routes y Route

import Home from './components/Home/Home.jsx';           // Contenedor Home donde se encuentran las Cards y a su vez Card
import Nav from './components/Nav/Nav.jsx';              //Contenedor de la barra de navegación
import About from "./components/About/About.jsx";        //Acerca de...(en este caso, mi persona)
import Detail from "./components/Detail/Detail.jsx";     //Detalles del personaje
import Form from "./components/Form/Form.jsx";           // Formulario de registro
import Error from "./components/Error.jsx";              //Página de Error
import Favorites from './components/Favorites/Favorites.jsx';

import style from './App.module.css';                    //Estilos para App.jsx

import axios from "axios";                               // Obtención de los personajes hacia la API

import video from "./imagenes/Space.mp4";
import sound from "./imagenes/sound-metroid-fusion.mp3";
import sound2 from "./imagenes/song-about.mp3"

function App() {

  const [addedCharacterIds, setAddedCharacterIds] = useState([]); // NO personajes repetidos
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener ubicación para mostrar la Nav
  const email = "bryan@henry.com";
  const password = "Bryan40a";


  //---Buscar---------------------------------------------------------------------------------------

  function onSearch(id) {

    // Verificar si el ID ya existe en el estado addedCharacterIds
    if (addedCharacterIds.includes(id)) {
      window.alert('Este personaje ya ha sido agregado.');
      return;
    }

    // agrega personajes a characters
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
       if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
          setAddedCharacterIds((oldIds) => [...oldIds, Number(id)]);
       } else {
          window.alert('¡No hay personajes con este ID!');
       }
    });
 }

  //---Random---------------------------------------------------------------------------------------

  function addRandomCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;

    if (addedCharacterIds.includes(randomId)) {
      window.alert('Este personaje ya ha sido agregado.');
      return;
    }

    axios(`https://rickandmortyapi.com/api/character/${randomId}`)
    .then(({ data }) => {
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
        setAddedCharacterIds((oldIds) => [...oldIds, randomId]);
      }
    });
  }

  //---Cerrar carta---------------------------------------------------------------------------------------

  function onClose(id){

    let arregloFiltrado1 = characters.filter((character) => {
      return character.id !== Number(id);
    });
    setCharacters(arregloFiltrado1);

    let arregloFiltrado2 = addedCharacterIds.filter((characterid) => {
      return characterid !== Number(id);
    });
    setAddedCharacterIds(arregloFiltrado2);
  }

  //---Login (sign in)---------------------------------------------------------------------------------------

  function login(userData){
    if(userData.email == email && userData.password == password){
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //---Log out---------------------------------------------------------------------------------------

  function logout() {
    setAccess(false);
  }

  //---Renderizar---------------------------------------------------------------------------------------

  return (
    <div className={style.App}>

      {/* Que el video se reproduzca sin interrupción en todas excepto en "/","/about" y "*" */}
      {(location.pathname !== '/' && location.pathname !== '/about' && location.pathname !== '*') && (
        <div className={style.videoContainer}>
          <video src={video} type="video/mp4" className={style.video} autoPlay loop muted/>
        </div>
      )}

      {/*Que el audio se reproduzca sin interrupción en todas excepto en "/","/about" y "*"*/}
      {(location.pathname !== '/' && location.pathname !== '/about' && location.pathname !== '*') && (
        <audio autoPlay loop>
          <source src={sound} type="audio/mp3"/>
        </audio>
      )}

      {/* Que el audio se reproduzca solo en "/about" */}
      {(location.pathname === '/about') && (
        <audio autoPlay loop>
          <source src={sound2} type="audio/mp3"/>
        </audio>
      )}

      {/*Mostrar Nav en todas excepto en "/" */}
       {location.path !== '/' && location.path !== '*' && <Nav onSearch={onSearch} addRandomCharacter={addRandomCharacter} logout={logout}/>}

      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route path="/home" element={<Home characters={characters} onClose={onClose} />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites onClose={onClose} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
