import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthAPI from "../services/Auth";
import userReducer from "./authSlice";
import darkModeReducer from "./darkModeSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import PostsAPI from "@/services/Post";

const rootReducer = combineReducers({
  user: userReducer,
  darkMode: darkModeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [PostsAPI.reducerPath]: PostsAPI.reducer,
    persisted: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      AuthAPI.middleware,
      PostsAPI.middleware
    ]),
});

export const persistor = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
