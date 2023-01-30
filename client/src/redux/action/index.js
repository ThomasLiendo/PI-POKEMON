import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SELECT_POKEMONS = "SELECT_POKEMONS";
export const CLEAR = "CLEAR";
export const GET_DETAIL = "GET_DETAIL";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
export const FILTER_BY_STATE = "FILTER_BY_STATE";
export const POST_POKEMON = "POST_POKEMON";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/pokemons");
      console.log(apiData);
      const pokemons = apiData.data;
      return dispatch({
        type: GET_POKEMONS,
        //se le dice aca la action que tiene que hacer
        payload: pokemons,
        //aca le pasamos la informacion que querramos que ponga ahi
      });
    } catch (error) {
      console.error("Pokemons cannot be brought");
    }
  };
};
export function getTypes() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (error) {
      console.log("Pokemons cannot be brought");
    }
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log("Pokemon Not Found");
    }
  };
}
export function orderPokemons(payload) {
  return {
    type: ORDER_POKEMONS,
    payload: payload,
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log("Pokemon not found");
    }
  };
}

export function orderByName(payload) {
  return {
    type: GET_POKEMON_BY_NAME,
    payload,
  };
}

export function filterByType(gabi) {
  return {
    type: FILTER_BY_TYPE,
    payload: gabi,
  };
}
export function filterByState(payload) {
  return {
    type: FILTER_BY_STATE,
    payload,
  };
}

export function createPokemons(payload) {
  return async function (dispatch) {
    try {
      const pokemons = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return dispatch({
        type: POST_POKEMON,
        payload: pokemons.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearMyStore() {
  return {
    type: CLEAR,
  };
}

// CAMBIOS EN EL ESTADO
