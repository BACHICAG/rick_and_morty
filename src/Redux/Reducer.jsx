import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./Actions.jsx";

const initialState = {
    myFavorites: [],
    allCharacters: [],
};

export default function reducer (state = initialState, action) {

    switch (action.type) {

        case ADD_FAV:

            return{
                ...state,
                myFavorites:[...state.myFavorites, action.payload ],
                allCharacters:[...state.allCharacters, action.payload ],
            };

        case REMOVE_FAV:
            
            // filtra los personajes para mantener en el array los personajes diferentes al que se quiere quitar,
            // de esta forma estaríamos excluyendo al personaje que se quiere remover de los que se quiren mantener
            const removeCharacterFav = [...state.myFavorites].filter((character) => {
                                       character.id != action.payload
            });

            return{
                ...state,
                myFavorites: removeCharacterFav,
            };

        case FILTER:

            const filteredCharacters = action.payload === "all" ?
            [...state.allCharacters] : [...state.allCharacters].filter(
                (character) => character.gender === action.payload
            );

            return{
                ...state,
                myFavorites: filteredCharacters,
            };

        case ORDER:

            const sortedCharacters = [...state.allCharacters].sort((a, b) => {
                if (action.payload === "A") {
                  return a.id - b.id;
                } else if (action.payload === "D") {
                  return b.id - a.id;
                }
              });

            return{
                ...state,
                myFavorites: sortedCharacters,
            };

        default:
            return{
                ...state
            };
    };
}