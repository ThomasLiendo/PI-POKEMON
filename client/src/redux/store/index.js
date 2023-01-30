import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

export const store = createStore(rootReducer, applyMiddleware(thunk));

//ESTA ES LA FUENTE DE VERDAD

//Deposito princripal donde se almacena todos los estados de una aplicacion

// "Global State"
