import React, {useState} from "react"
import { connect } from 'react-redux';
import { removeFav, filterCards, orderCards } from '../../Redux/Actions.jsx';
import { useDispatch } from 'react-redux';
import Card from "../Cards/Card.jsx";
import style from "./Favorites.module.css"

function Favorites (props) {
  const { myFavorites, onClose, removeFav, } = props;
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  const [filterValue, setFilterValue] = useState('all');
  
  function handleCloseFavorite(id){
    onClose(id);
    removeFav(id);
  }

  function handleOrder(e) {
    dispatch(orderCards(e.target.value));
    setAux(!aux)
  }

  function handleFilter(e) {
    const value = e.target.value;
    setFilterValue(value);

    if (value === 'all') {
      // Mostrar todos los personajes
      dispatch(filterCards('all'));
    } else {
      dispatch(filterCards(value));
    }
  }

  return(
    <div className={style.container}>

      <div className={style.OyF}>

        <div className={style.orden}>
          <label htmlFor="orderSelect" className={style.label}>Orden: </label>
          <select id="orderSelect" className={style.select} onChange={handleOrder}>
            <option value="">Elija una opcion</option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>

        <div className={style.genero}>
          <label htmlFor="filterSelect" className={style.label}>Género: </label>
          <select id="filterSelect" className={style.select} onChange={handleFilter} value={filterValue}>
            <option value="">Elija una opción</option>
            <option value="all">Todos</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

      </div>
      
      <div className={style.container_cartas}>
      {myFavorites && myFavorites.filter((character) => 
        {return(filterValue === 'all' ? true : character.gender === filterValue)}).map((character) => {
            return(
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin}
                image={character.image}
                onClose={() => {handleCloseFavorite(character.id);}}
              />
            );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    myFavorites: state.myFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
    return{
      removeFav: (id) => {dispatch(removeFav(id))},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
