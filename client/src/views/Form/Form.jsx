import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getPokemons, getTypes, createPokemons } from "../../redux/action";
import styles from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory(); //useNavigate()
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (!types.length) dispatch(getTypes());
    if (!pokemons.length) dispatch(getPokemons());
  }, [dispatch]);

  const [newPokemon, setNewPokemon] = useState({
    name: "",
    health: 0,
    attack: 0,
    height: 0,
    defense: 0,
    speed: 0,
    weight: 0,
    img: "",
    type: [],
  });

  const handlerInput = (e) => {
    //aca se va a manipular el seteo y actualizacion del estado, de cuando se CREO el pokemon
    setNewPokemon({
      ...newPokemon,
      [e.target.name]: e.target.value,
    });
  };

  const handlerCreatePokemon = (e) => {
    e.preventDefault();
    dispatch(createPokemons(newPokemon));
    alert("Pokemon added to the Pokedex");
    setNewPokemon({
      name: "",
      health: 0,
      attack: 0,
      height: 0,
      defense: 0,
      speed: 0,
      weight: 0,
      img: "",
      type: [],
    });
    history.push("/home");
  };

  return (
    <div>
      <SearchBar />
      <div className={styles.contenedor}>
        <form
          className={styles.contenedorForm}
          onSubmit={handlerCreatePokemon} //el onSubmit permite asociar una funcion de test en el formulario, osea que si la funcion retorna false los datos del form no se envian, quedan ahi en la pagina
        >
          <div className={styles.form}></div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={newPokemon.name}
              placeholder="Write the name"
              onChange={(e) => handlerInput(e)}
            />
          </label>
          {/* VALIDACION */}
          <label>
            Health
            <input
              type="number"
              name="health"
              value={newPokemon.health}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the health"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Attack
            <input
              type="number"
              name="attack"
              value={newPokemon.attack}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Attack"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Height
            <input
              type="number"
              name="height"
              value={newPokemon.height}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Height"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Defense
            <input
              type="number"
              name="defense"
              value={newPokemon.defense}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Defense"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Speed
            <input
              type="number"
              name="speed"
              value={newPokemon.speed}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Speed"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Weight
            <input
              type="number"
              name="weight"
              value={newPokemon.weight}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Weight"
            />
          </label>
          {/* VALIDACION */}
          <label>
            Img
            <input
              type="text"
              name="img"
              value={newPokemon.img}
              onChange={(e) => handlerInput(e)}
              placeholder="Insert the Image"
            />
          </label>
          {/* <div className={styles.form}>
            <label>
              Select a Type:
              <select
                defaultValue={"default"}
                onChange={(e) => handlerSelectType(e)}
              >
                <option value="default">Choose type</option>
                {types &&
                  types.map((element) => {
                    return (
                      <option key={element.name} value={element.name}>
                        {element.name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          <div>
            <ul>
              {newPokemon.type.length > 0 ? (
                newPokemon.type.map((ele) => (
                  <li key={ele} onClick={(e) => handlerEliminateType(e)}>
                    {ele}
                  </li>
                ))
              ) : (
                // Validation
                <p>NADA</p>
              )}
            </ul>
          </div> */}
          <div>
            <button
              className={styles.button}
              onClick={(e) => {
                handlerCreatePokemon(e);
              }}
            >
              ¡Create Your Pokemon!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
