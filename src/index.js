import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

@observer
class App extends React.Component {
  render() {
    const store = this.props.store;

    return (
      <div>
        app
      </div>
    );
  }
}

