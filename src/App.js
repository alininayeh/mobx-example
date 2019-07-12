import React from 'react';
import { observer } from 'mobx-react';
import { generateMessages } from './utils';
import MessagePreview from './MessagePreview';

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

export default App;