import { combineReducers } from "redux";
import selectedPersona from "./selectedOption";
import visibility from "./searchvisible";
import getQuery from "./getQuery";
import productDetail from "./productDetail";

const rootReducer = combineReducers({
    selectedPersona: selectedPersona,
    visibility: visibility,
    getQuery: getQuery,
    productDetail: productDetail
});

export default rootReducer;
