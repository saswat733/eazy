import { combineReducers, configureStore, isRejected } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authReducer, { logout } from "./auth/authSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import settingReducer from "./settings/settingSlice";
import { authApi } from "../services/authApi";

import toast from "react-hot-toast";
import { companyApi } from "../services/companyApi";
import { accountApi } from "../services/accountApi";
import { bankingApi } from "../services/bankingApi";
import { rolesApi } from "../services/rolesApi";
import { salesApi } from "../services/salesApi";
import { expenseApi } from "../services/expenseApi";
import { generalApi } from "../services/generalApi";
import { fixedAssetsApi } from "../services/fixedAssetsApi";
import { reportsApi } from "../services/reportsApi";
import { menuApi } from "../services/menuApi";
import { plansApi } from "../services/planApi";

const tokenErrorToast = (api) => (next) => (action) => {
  if (isRejected(action)) {
    if (action.payload?.status === 403) {
      toast.error(
        action.payload?.data?.message ||
          "Your session has expired, please login again...",
        {
          id: "tokenError",
        }
      );
      store.dispatch(logout());
    }
  }

  return next(action);
};

const persistConfig = {
  key: "admin-ultra",
  version: 1,
  storage,
  whitelist: ["auth", "sidebar", "settings"],
  transforms: [
    encryptTransform({
      secretKey: "import.meta.env.PERSIST_SEC",
      onError: (error) => {
        console.log("error", error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  settings: settingReducer,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [bankingApi.reducerPath]: bankingApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [salesApi.reducerPath]: salesApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
  [fixedAssetsApi.reducerPath]: fixedAssetsApi.reducer,
  [reportsApi.reducerPath]: reportsApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [plansApi.reducerPath]: plansApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      tokenErrorToast,
      authApi.middleware,
      companyApi.middleware,
      accountApi.middleware,
      bankingApi.middleware,
      rolesApi.middleware,
      salesApi.middleware,
      expenseApi.middleware,
      generalApi.middleware,
      fixedAssetsApi.middleware,
      reportsApi.middleware,
      menuApi.middleware,
      plansApi.middleware,
    ]),
});

export let persistor = persistStore(store);
export default store;
