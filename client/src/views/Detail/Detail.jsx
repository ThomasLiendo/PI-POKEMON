import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearMyStore } from "../../redux/action/index";
import styles from "./Detail.module.css";

import image from "../../assets/image.gif";

export default function Detail() {
  const { id } = useParams();
  const [pokemonDetail, setPokemon] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => window.alert("no se encontro el pokemon"));
    return () => setPokemon({});
  }, [id]);

  return (
    <div className={styles.bodyDetail}>
      <div className={styles.nav}>
        <Link to="/home">
          <button className={styles.button} onClick={clearMyStore}>
            BACK
          </button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.Card}>
          {pokemonDetail[0] ? (
            <div>
              <p className={styles.id}>id:{pokemonDetail[0].id}</p>
              <p className={styles.name}>Name:{pokemonDetail[0].name}</p>
              <img
                className={styles.img}
                src={pokemonDetail[0].img}
                alt="IMAGE NOT FOUND"
              />

              <h3 className={styles.type}>types:{pokemonDetail[0].type}</h3>
              <h3 className={styles.hp}>health:{pokemonDetail[0].health}</h3>
              <h3 className={styles.attack}>
                attack:{pokemonDetail[0].attack}
              </h3>
              <h3 className={styles.defense}>
                defense:{pokemonDetail[0].defense}
              </h3>
              <h3 className={styles.speed}>speed:{pokemonDetail[0].speed}</h3>
              <h3 className={styles.height}>
                height:{pokemonDetail[0].height}
              </h3>
              <h3 className={styles.weight}>
                weight:{pokemonDetail[0].weight}
              </h3>
            </div>
          ) : (
            <div className={styles.nav}>
              <img
                src={image}
                className={styles.loadingPokemon}
                styles={{ width: "100px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//    else {
//     return (
//       <div>
//         <div></div>
//         <img src={image} styles={{ width: "100px" }} />
//       </div>
//     );
//   }
