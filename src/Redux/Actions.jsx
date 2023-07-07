//----------- ACTIONS TYPES -----------
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

//----------- ACTIONS CREATORS -----------

//Añadir Favorito
export function addFav (character) {
    return{
        type: ADD_FAV,
        payload: character
    };
}

//Eliminar o remover de favoritos
export function removeFav (id) {
    return{
        type: REMOVE_FAV,
        payload: id
    };
}

//Filtrar Cartas
export function filterCards(gender) {
    return{
        type: FILTER,
        payload: gender
    };   
}

//Ordenar Cartas
export function orderCards(orden) {
    return{
        type: ORDER,
        payload: orden
    };   
}