import React from "react";
import { Link } from "react-router-dom";
import pokeImage from "../../assets/wallpaper.jpg";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.Landing}>
      <img src={pokeImage} alt="image" className={styles.Image} />
      <Link to="/home">
        <button className={styles.button}>Login</button>
      </Link>
    </div>
  );
}
