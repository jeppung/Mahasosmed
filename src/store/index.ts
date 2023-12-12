import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore } from "redux-persist";

/*
  Noop storage configuration to tackle error redux persist store cannot be created
  because redux trying to access localstorage to create persist store in server-side
*/
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};

/* 
  Redux Store Configuration
  - middleware added to ignore serializable that can cause error for redux persist
*/
const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }),
});

/* 
    THIS SHOULD BE EXIST FOR PERSIST STORAGE TO WORK!
    if not, persistent local storage wont be created
*/
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
