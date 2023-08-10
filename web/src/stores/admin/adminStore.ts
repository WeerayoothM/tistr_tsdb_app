import { action, makeObservable, observable } from "mobx";

export interface IAdminStore {
  searchObject: any;
}

export class AdminStore implements IAdminStore {
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
