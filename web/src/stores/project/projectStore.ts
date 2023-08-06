import { action, makeObservable, observable } from "mobx";

export interface IProjectStore {
  searchObject: any;
}

export class ProjectStore implements IProjectStore {
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
