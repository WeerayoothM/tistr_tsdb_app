import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { userLogin } from "./APIS/index";
import { getToken, removeToken, setToken } from "../../utils/localStorage";
import { isEmpty } from "lodash";

export interface IUserStore {
  role: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

export class UserStore implements IUserStore {
  @observable
  role: string = "guest";

  constructor() {
    makeObservable(this);
  }

  async login(payload: LoginPayload) {
    try {
      const resp = await userLogin(payload);
      // if (!resp?.data.token) return;
      // setToken(resp?.data.token);
      // this.role = resp?.data.role.name;

      if (isEmpty(resp.data)) return { success: false };
      return { success: true };
    } catch (e: any) {
      return { success: false };
      // console.log("login error:", e);
    }
  }

  async logout() {
    try {
      removeToken();
      this.role = "guest";
    } catch (e) {
      console.log("logout error:", e);
    }
  }

  authorize() {
    return getToken();
  }
}
