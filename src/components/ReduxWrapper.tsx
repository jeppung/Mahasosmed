"use client";
import store, { persistor } from "@/store";
import { Loader } from "@mantine/core";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxWrapper;

/* 
    PersistGate use to delay the UI rendering until the data is available in the store
    it will tackle the rehydration problem
*/
