import { action, makeObservable, observable } from "mobx";

export interface IMainStore {
  isLoading: boolean;
}

export class MainStore implements IMainStore {
  @observable
  isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setIsLoading(isLoadingIn: boolean) {
    this.isLoading = isLoadingIn;
  }
}
