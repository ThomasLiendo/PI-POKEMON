import {
  GET_POKEMONS,
  SELECT_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  ORDER_POKEMONS,
  FILTER_BY_TYPE,
  FILTER_BY_STATE,
  POST_POKEMON,
} from "../action";

const initialState = {
  pokemons: [],
  allPokemons: [],
  allTypes: [],
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: [...action.payload],
        allPokemons: [...action.payload],
      };
    case SELECT_POKEMONS:
      return {
        onePokemon: action.payload,
      };
    case GET_POKEMON_BY_NAME:
      if (!action.payload.length) {
        return alert("Pokemon Not found");
      }
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        allTypes: [...action.payload],
      };
    case FILTER_BY_TYPE:
      if (action.payload === "all")
        return { ...state, pokemons: [...state.allPokemons] };
      let allPokemonsType = [
        ...state.allPokemons.filter((e) => {
          return (
            action.payload ===
            e.type?.find((element) => element === action.payload)
          );
        }),
      ];
      return {
        ...state,
        pokemons: [...allPokemonsType],
      };
    case ORDER_POKEMONS:
      ///////// NO FUNCIONA
      ////////SEPARAR EN A - Z Y DE ATTACK<ATTACK
      if (action.payload === "all")
        return { ...state, pokemons: [...state.allPokemons] };
      const pokemonOrder = [...state.allPokemons];
      const order =
        action.payload === "A-Z"
          ? pokemonOrder.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "Z-A"
          ? pokemonOrder.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "weakness"
          ? pokemonOrder.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : pokemonOrder.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,

        pokemons: [...order],
      };
    case FILTER_BY_STATE:
      let stateFiltered =
        action.payload === "none"
          ? [
              ...state.allPokemons.filter((e) => {
                return typeof e.id === "number";
              }),
            ]
          : [
              ...state.allPokemons.filter((e) => {
                return typeof e.id !== "number";
              }),
            ];
      return {
        ...state,
        pokemons: [...stateFiltered],
      };
    case POST_POKEMON:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;

//en el reducer consume las actions y lo unico que se hace es aceptar dos cosas: state y action las acepta y devuelve una nueva instancia del estado actualizado

//el reducer NO CAMBIA NINGUNA PARTE DEL ESTADO, produce una nueva INSTANCIA (ACTUALIZA)

//                        ^     ===========> ACTION
//                        |       dispatch     |
//                        |                    |
//                        |                    v
//                      VIEW/UI             REDUCERS
//                        |                    |
//                        |                    |
//                        |     subscribe      V
//                        |     <==========   STORE
//
//
