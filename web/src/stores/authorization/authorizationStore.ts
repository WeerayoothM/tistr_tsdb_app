import { action, makeObservable, observable } from "mobx";

export interface IAuthorizationStore {
  searchObject: any;
}

export class AuthorizationStore implements IAuthorizationStore {
  @observable
  searchObject: any = {};

  constructor() {
    makeObservable(this);
  }

  @action
  setSearchObject(value: any) {
    this.searchObject = value || {};
  }
}
