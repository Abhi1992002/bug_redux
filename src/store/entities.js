import { combineReducers } from "redux";
import bugReduer from "./bugs"
import projectReducer from "./projects.js"
import userReducer from "./users.js"

// we have 2 slices bugs and projects
export default combineReducers({
    bugs: bugReduer,
    projects : projectReducer,
    users : userReducer
})