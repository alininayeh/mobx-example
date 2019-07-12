import React from 'react';
import { observer } from 'mobx-react';

// We can use also the observer() function like this. For stateless components this is the way to use, since @observer can be used only with classes
const MessagePreview = observer(({message}) => (
  <div className={`message ${!message.read && 'read'}`} onClick={() => message.read = true}>
    <h2>{message.subject}</h2>
    <p>{message.description}</p>
  </div>
));

export default MessagePreview;