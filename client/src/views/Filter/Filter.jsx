import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderPokemons } from "../../redux/action/index";

export default function Filter({ pagination }) {
  const [order, setOrder] = useState("1");

  const dispatch = useDispatch();

  function handleOrder(e) {
    const { value } = e.target;
    pagination(1);
    dispatch(orderPokemons(value));
    setOrder(value);
    e.preventDefault();
  }

  return (
    <div>
      <select onChange={(e) => handleOrder(e)}>
        <option value="all">All</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="stronge">stronger</option>
        <option value="weakness">weakness</option>
      </select>
    </div>
  );
}
