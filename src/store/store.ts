import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import your reducer
import CustomizerReducer from "./customizer/CustomizerSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['customizer'] 
};

const persistedReducer = persistReducer(persistConfig, CustomizerReducer);

export const store = configureStore({
  reducer: {
    customizer: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;