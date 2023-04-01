import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default function createStore() {
  const store = configureStore({ 
    reducer: reducer ,
    middleware:[
      ...getDefaultMiddleware(),
      // logger({destination:"logger"}),
      toast,
      api
    ]
});
  return store;
}
