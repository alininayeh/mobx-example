import {observable, computed} from 'mobx';

class Store {
  // the initial state
  @observable counter = 0;

  // the "reducer"
  @computed get count() {
    return this.counter;
  }

  // the "action"
  increment() {
    this.counter++;
  }
}

export default new Store();