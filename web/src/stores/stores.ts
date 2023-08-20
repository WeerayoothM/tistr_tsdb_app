import { createContext, useContext } from "react";
import { UserStore } from "./user/userStore";
import { MainStore } from "./main/mainStore";
import { ProjectStore } from "./project/projectStore";
import { AuthorizationStore } from "./authorization/authorizationStore";
import { AdminStore } from "./admin/adminStore";
import { ImportStore } from "./import/importStore";

const stores = Object.freeze({
  userStore: new UserStore(),
  mainStore: new MainStore(),
  projectStore: new ProjectStore(),
  authorizationStore: new AuthorizationStore(),
  adminStore: new AdminStore(),
  importStore: new ImportStore(),
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
