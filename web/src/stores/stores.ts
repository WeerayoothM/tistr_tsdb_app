import { createContext, useContext } from "react";
import { UserStore } from "./user/userStore";
import { MainStore } from "./main/mainStore";

const stores = Object.freeze({
  userStore: new UserStore(),
  mainStore: new MainStore(),
});

export const StoreContext = createContext(stores);
export const StoreContextProvider = StoreContext.Provider;
export const useStores = () => {
  return useContext<typeof stores>(StoreContext);
};

export const useStore = <T extends keyof typeof stores>(
  store: T
): (typeof stores)[T] => useContext(StoreContext)[store];

export default stores;
