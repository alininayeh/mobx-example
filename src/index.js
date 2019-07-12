import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import './index.css';

// We'll use this to generate a fake list of messages
const generateMessages = (n) => {
  const messages = [];

  for (let i = 0; i < n; i++) {
    messages.push({
      subject: `Message ${i}`,
      description: 'Hello world!',
      read: false
    });
  }

  return messages;
};

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

// We can use also the observer() function like this. For stateless components this is the way to use, since @observer can be used only with classes
const MessagePreview = observer(({message}) => (
  <div className={`message ${!message.read && 'read'}`} onClick={() => message.read = true}>
    <h2>{message.subject}</h2>
    <p>{message.description}</p>
  </div>
));

// The component is a "reaction". This means that it will react to the store's data changes, but won't return any value
@observer
class App extends React.Component {
  componentDidMount() {
    // The initial state here is [], as declared in the MessageStore
    // When changing the props like this, the store will auto-update
    this.props.store.messages = generateMessages(5);
  }

  render() {
    // These props will be updated each time there's a change in the store's data that affects these values
    // messages is not an actual array here, it's a "proxy" that accepts array's methods like map, filter, reduce etc.
    const {messages, messageCount, unreadMessageCount} = this.props.store;

    return (
      <div className='messages'>
        <h1>Inbox ({messageCount} messages, {unreadMessageCount} unread messages)</h1>
        {messages.map((message, i) => <MessagePreview message={message} key={i} />)}
      </div>
    );
  }
}

// We just need to pass the store to the component, no Provider or connect here :)
ReactDOM.render(<App store={new MessagesStore()} />, document.getElementById('root'));
