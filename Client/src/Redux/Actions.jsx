import axios from "axios";

//----------- ACTIONS TYPES -----------

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

//----------- ACTIONS CREATORS -----------

//Añadir Favorito

export const addFav = (character) => {
   const endpoint = "http://localhost:3001/favorites/";

   return async (dispatch) => {
      try {
         const axiosRequest = await axios.post(endpoint, character);
         const { data } = axiosRequest;

         return dispatch({
            type: "ADD_FAV",
            payload: data,
         });
      }
      catch (error) {
         window.alert(error.message);
      }
   };
};

//Eliminar o remover de favoritos

export const removeFav = (id) => {
   const endpoint = "http://localhost:3001/favorites/" + id;

   return async (dispatch) => {
      try {
         const axiosRequest2 = await axios.delete(endpoint);
         const { data } = axiosRequest2;
         
         return dispatch({
            type: "REMOVE_FAV",
            payload: data,
         });
      }
      catch (error) {
         window.alert(error.message);
      }
   };
};

//Filtrar Cartas
export function filterCards(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}

//Ordenar Cartas
export function orderCards(orden) {
  return {
    type: ORDER,
    payload: orden,
  };
}
