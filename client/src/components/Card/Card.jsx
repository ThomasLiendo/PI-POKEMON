import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { getDetail } from "../../redux/action";

const Card = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getDetail(props.id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.Card}>
        <div className={styles.front}>
          <Link to={`/detail/${props.id}`}>
            <h3 onClick={handleClick} className={styles.name}>
              {props.name}
            </h3>
            <img src={props.img} alt="IMAGE NOT FOUND" className={styles.img} />
          </Link>
        </div>
        <div className={styles.details}>
          <p>id:{props.id}</p>
          <p>type:{props.type}</p>
          <p>health:{props.health}</p>
          <p>attack:{props.attack}</p>
          <p>defense:{props.defense}</p>
          <p>speed:{props.speed}</p>
          <p>height:{props.height}</p>
          <p>weight:{props.weight}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

// componente dumb/presentacional, osea que no tiene logica y solo muestra
