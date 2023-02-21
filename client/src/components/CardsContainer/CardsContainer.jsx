import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/action";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/action";
import Paginated from "../Paginated/Paginated";

const CardsContainer = () => {
  //Este componente debe tomar un array de usuarios, y por cada usuario renderizar un componente Card
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const pokemons = useSelector((state) => state.pokemons);
  const allPokemons = useSelector((state) => state.allPokemons);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    if (!allPokemons.length) dispatch(getPokemons());
    // dispatch(getTypes());
  }, [pokemons]);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.CardsContainer}>
      {currentPokemon?.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            type={pokemon.type}
            health={pokemon.health}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
          />
        );
      })}
      <Paginated
        className={styles.paginatedBody}
        pokemonPerPage={pokemonPerPage}
        pokemons={pokemons?.length}
        currentPage={currentPage}
        pagination={pagination}
      />
    </div>
  );
};

export default CardsContainer;
