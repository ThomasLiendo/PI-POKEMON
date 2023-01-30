import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/action/index";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  //predeterminamos que el dispatch sea el hook useDispatch(), que lo que va hacer es actualizar el estado que se quiera actualizar.
  const [name, setName] = useState("");
  //aca instanciamos un estado y su actualizacion. El hook useState lo que nos permite es añadir el estado de React que querramos a un componente de funcion.

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(getPokemonByName(name)); //el name va a ser mi estado local y se lo va a mandar a la action para asi a posterior se lo va a enviar al back
    } else {
      alert("that name is not valid!!");
    }
  };

  return (
    <div className={styles.center}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.inputBlock}>
          <input
            type="text"
            name="input-text"
            required
            spellCheck="false"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <h4 className={styles.placeholder}>Find your favorite Pokemon</h4>
        </div>
      </form>
    </div>
  );
}
