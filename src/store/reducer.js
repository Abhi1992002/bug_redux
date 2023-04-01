import { combineReducers } from "redux";
import entitiesReducer from "./entities"

export default combineReducers({
    entites : entitiesReducer
})