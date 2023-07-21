import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./Actions.jsx";

const initialState = {
    myFavorites: [],
    allCharacters: [],
};

export default function reducer (state = initialState, action) {

    switch (action.type) {

        case ADD_FAV:

            return { ...state, myFavorites: action.payload, allCharacters: action.payload };

        case REMOVE_FAV:
            
        return { ...state, myFavorites: action.payload, allCharacters: action.payload};

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