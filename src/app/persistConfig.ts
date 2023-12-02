import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { Reducer } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  // Puedes configurar opciones adicionales aquí si es necesario
};

export const persistedReducer = (reducer: Reducer) =>
  persistReducer(persistConfig, reducer);
