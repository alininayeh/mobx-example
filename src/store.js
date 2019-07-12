import {observable, computed} from 'mobx';

// The data for the messages will be kept in this store
class MessagesStore {
  // By adding the @observable decoration we tell the store that this property needs to be checked for changes
  @observable messages = [];

  // By adding the @computed decoration we make sure that this function will always return the updated value
  // Also this will be called each time there are changes in the messages list
  // Think of this like a Redux reducer, but which is called automatically, without needing to dispatch an action
  @computed get messageCount() {
    return this.messages.length;
  }

  @computed get unreadMessageCount() {
    return this.messages.filter(message => message.read === false).length;
  }
}

export default new MessagesStore();