import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  filterByState,
  filterByType,
  getPokemons,
  getTypes,
} from "../../redux/action";
import styles from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filter from "../Filter/Filter";
import background from "../../assets/background.jpg";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!allPokemons.length) dispatch(getPokemons());
    if (!allTypes.length) dispatch(getTypes());
  }, [pokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const rechargePokemon = () => {
    dispatch(getPokemons());
    setCurrentPage(1);
  };

  const filterType = (e) => {
    dispatch(filterByType(e.target.value));
  };

  const filterState = (e) => {
    dispatch(filterByState(e.target.value));
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>POKEDEX</h1>
      <button onClick={rechargePokemon} className={styles.button}>
        Recharge
      </button>
      <Filter pagination={pagination} />
      <select onChange={filterType} className={styles.button}>
        <option value="all">All types</option>
        {allTypes.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <select onChange={filterState} className={styles.button}>
        <option value="none">By state</option>
        <option value="true">Created</option>
      </select>

      <Link to="/pokemon">
        <button className={styles.button}>Create Pokemon</button>
      </Link>

      <SearchBar setCurrentPage={setCurrentPage} />
      <CardsContainer />
    </div>
  );
}
