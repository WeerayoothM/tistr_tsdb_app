import { action, makeObservable, observable } from "mobx";

export interface IImportStore {
  searchObject: any;
}

export class ImportStore implements IImportStore {
  @observable
  type: string = "import";
  searchObject: any = {};

  constructor() {
    makeObservable(this);
  }

  @action
  setSearchObject(value: any) {
    this.searchObject = value || {};
  }
  setType(value: string) {
    this.type = value || "check";
  }
}
