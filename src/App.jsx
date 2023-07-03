import React, {useState, useEffect} from 'react';             //biblioteca utilizada para construir interfaces de usuario interactivas y reactivas.
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";   //Utilizado para poder utilizar Routes y Route

import Cards from './components/Cards/Cards.jsx';        // Contenedor donde se encuentran las cartas
import Nav from './components/Nav/Nav.jsx';            //Contenedor de la barra de navegación
import About from "./components/About/About.jsx";        //Acerca de...(en este caso, mi persona)
import Detail from "./components/Detail/Detail.jsx";      //Detalles del personaje
import Form from "./components/Form/Form.jsx";          // Formulario de registro
import Error from "./components/Error.jsx";        //Página de Error

import style from './App.module.css';              //Estilos para App.jsx

import axios from "axios"                          // Obtención de los personajes hacia la API


function App() {

  const [characters, setCharacters] = useState([]);
  const [addedCharacterIds, setAddedCharacterIds] = useState([]); // NO personajes repetidos
  const location = useLocation(); // Obtener ubicación para mostrar la Nav
  const [access, setAccess] = useState(false);
  const email = "bryan@henry.com";
  const password = "Bryan40a";
  const navigate = useNavigate();


  //---Buscar---------------------------------------------------------------------------------------

  function onSearch(id) {

    // Verificar si el ID ya existe en el estado addedCharacterIds
    if (addedCharacterIds.includes(id)) {
      window.alert('Este personaje ya ha sido agregado.');
      return;
    }

    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
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

    axios(`https://rickandmortyapi.com/api/character/${randomId}`).then(({ data }) => {
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
    !access && navigate('/');
  }, [access]);

  //---Log out---------------------------------------------------------------------------------------

  function logout() {
    setAccess(false);
  }

  //---Renderizar---------------------------------------------------------------------------------------

  return (
    <div className={style.App}>
      {/*Mostrar Nav en todas excepto en "/" */}
       {location.path !== '/' && <Nav onSearch={onSearch} addRandomCharacter={addRandomCharacter} logout={logout}/>}
      <Routes>
        <Route path="/" element={<Form login={login}/>}/>
        <Route path="/home" element={<Cards characters={characters} onClose={onClose} />}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
