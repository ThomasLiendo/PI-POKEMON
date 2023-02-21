import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getPokemons, getTypes, createPokemons } from "../../redux/action";
import styles from "./Form.module.css";
// import { validate } from "./validation";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory(); //useNavigate()
  const allTypes = useSelector((state) => state.allTypes);
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (!allTypes.length) dispatch(getTypes());
    if (!pokemons.length) dispatch(getPokemons());
  }, []);

  const [type, setType] = useState([]);
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    type: [],
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    img: "",
  });

  const handlerOnChange = (e) => {
    //aca se va a manipular el seteo y actualizacion del estado, de cuando se CREO el pokemon
    setNewPokemon({
      ...newPokemon,
      [e.target.name]: e.target.value,
    });

    setValidation(
      validate({
        ...newPokemon,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlerinputType = (e) => {
    if (!e.target.checked)
      setNewPokemon({
        ...newPokemon,
        type: [
          ...newPokemon.type.filter((element) => element !== e.target.value),
        ],
      });
    else
      setNewPokemon({
        ...newPokemon,
        type: [...newPokemon.type, e.target.value],
      });
  };
  const handlerCreatePokemon = (e) => {
    e.preventDefault();
    // setNewPokemon({
    //   ...newPokemon,
    //   type: [...type],
    // });
    console.log(newPokemon);
    // if (Object.keys(validation).length) {
    //   alert("all spaces are required");
    // } else {
    //   if (Object.keys(validate(newPokemon)).length) {
    //     alert("fields must be complete");
    //   } else dispatch(createPokemons(newPokemon));
    //   alert("Pokemon added to the Pokedex");
    dispatch(createPokemons(newPokemon));
    setNewPokemon({
      name: "",
      type: [],
      health: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      img: "",
    });
    history.push("/home");
  };

  // VALIDATIONS
  const [validation, setValidation] = useState({});

  function validate(newPokemon) {
    let validated = {};
    let verificarQueContengaNumeros = /[1-9]/;
    const imageRegex = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|jpeg|gif|png)/i;

    if (newPokemon.name.length < 2)
      validated.name = "Necesita tener un minimo de 2 caracteres";
    if (newPokemon.name.length > 15)
      validated.name = "Tiene que tener un maximo de 15 caracteres";
    if (verificarQueContengaNumeros.test(newPokemon.name))
      validated.name = "No puede contener Numeros";

    if (Number(newPokemon.health) < 20)
      validated.health = "tiene que ser una vida mayor a 20";
    if (Number(newPokemon.health) > 1000)
      validated.health = "tiene que ser una vida menor a 1000";

    if (Number(newPokemon.height) < 20)
      validated.height = "tiene que ser una altura mayor a 20";
    if (Number(newPokemon.height) > 800)
      validated.height = "tiene que ser una altura menor a 800";

    if (Number(newPokemon.attack) < 20)
      validated.attack = "tiene que ser un ataque mayor a 20";
    if (Number(newPokemon.attack) > 500)
      validated.attack = "tiene que ser un ataque menor a 500";

    if (Number(newPokemon.defense) < 20)
      validated.defense = "tiene que ser una defensa mayor a 20";
    if (Number(newPokemon.defense) > 500)
      validated.defense = "tiene que ser una defensa menor a 500";

    if (Number(newPokemon.speed) < 20)
      validated.speed = "tiene que ser una velodidad mayor a 20";
    if (Number(newPokemon.speed) > 500)
      validated.speed = "tiene que ser una velocidad menor a 500";

    if (Number(newPokemon.weight) < 20)
      validated.weight = "tiene que ser un peso mayor a 20";
    if (Number(newPokemon.weight) > 1000)
      validated.weight = "tiene que ser un peso menor a 1000";

    if (!newPokemon.img.includes("https://"))
      validated.img = "Debe comenzar con https://";

    if (imageRegex.test(newPokemon.img))
      validated.img = "La imagen debe ser en formate jpg|jpeg|gif|png";

    if (newPokemon.type.length === 0)
      validated.type = "Debe contener al menos un tipo";

    return validated;
  }

  return (
    <div>
      <div className={styles.contenedor}>
        <form
          className={styles.contenedorForm}
          onSubmit={(e) => handlerCreatePokemon(e)} //el onSubmit permite asociar una funcion de test en el formulario, osea que si la funcion retorna false los datos del form no se envian, quedan ahi en la pagina
        >
          <div className={styles.form}></div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={newPokemon.name}
              placeholder="Write the name"
              onChange={(e) => handlerOnChange(e)}
            />
          </label>
          {validation.name ? <p>{validation.name}</p> : <p></p>}
          <label>
            Health
            <input
              type="number"
              name="health"
              value={newPokemon.hp}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the health"
            />
          </label>
          {validation.health ? <p>{validation.health}</p> : <p></p>}
          <label>
            Attack
            <input
              type="number"
              name="attack"
              value={newPokemon.attack}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Attack"
            />
          </label>
          {validation.attack ? <p>{validation.attack}</p> : <p></p>}
          <label>
            Height
            <input
              type="number"
              name="height"
              value={newPokemon.height}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Height"
            />
          </label>
          {validation.height ? <p>{validation.height}</p> : <p></p>}
          <label>
            Defense
            <input
              type="number"
              name="defense"
              value={newPokemon.defense}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Defense"
            />
          </label>
          {validation.defense ? <p>{validation.defense}</p> : <p></p>}
          <label>
            Speed
            <input
              type="number"
              name="speed"
              value={newPokemon.speed}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Speed"
            />
          </label>
          {validation.speed ? <p>{validation.speed}</p> : <p></p>}
          <label>
            Weight
            <input
              type="number"
              name="weight"
              value={newPokemon.weight}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Weight"
            />
          </label>
          {validation.weight ? <p>{validation.weight}</p> : <p></p>}
          <label>
            Img
            <input
              type="text"
              name="img"
              value={newPokemon.img}
              onChange={(e) => handlerOnChange(e)}
              placeholder="Insert the Image"
            />
          </label>
          {validation.img ? <p>{validation.img}</p> : <p></p>}

          {/* ------------------------------types-------------------------------------------*/}
          <label>
            Type
            <div>
              {allTypes?.map((obj, index) => {
                return (
                  <label
                    className={styles.typesLabel}
                    htmlFor={obj.name}
                    key={index}
                  >
                    {obj.name}
                    <input
                      type="checkbox"
                      name="type"
                      id={obj.name}
                      value={obj.name}
                      onChange={(e) => handlerinputType(e)}
                    />
                  </label>
                );
              })}
            </div>
          </label>
          <div>
            <button className={styles.button} type="submit">
              ¡Create Your Pokemon!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
