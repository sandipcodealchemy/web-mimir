"use client";

import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import loginSlice from "./login/Reducer";
import userSlice from "./user/Reducer";
import lessonSlice from "./lesson/Reducer";

let rootReducer;
if (typeof window !== "undefined") {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  /* COMBINE REDUCERS */
  const combinedReducers = combineReducers({
    login: loginSlice.reducer,
    user: userSlice.reducer,
    lesson: lessonSlice.reducer,
  });
  rootReducer = persistReducer({
    key: "root",
    version: 1,
    storage,
  }, combinedReducers);

} else {
  rootReducer = combineReducers({
    login: loginSlice.reducer,
    user: userSlice.reducer,
    lesson: lessonSlice.reducer,
  });
}


export type RootStateType = ReturnType<typeof rootReducer>;



// export const { setScreenHeight, setScrollHeight } = global.actions;

// export const store = configureStore({ reducer: reducers });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;


export const persistor = persistStore(store);
