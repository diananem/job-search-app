import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import reducer from "../reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["likedJobs"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore = () => {
  let store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
