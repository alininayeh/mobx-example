# Mobx example

This is a small example to help better understand how MobX works. The idea behind it is very simple and we get rid of extra code that is needed to be written, like in Redux implementations for example.

Before reading this you should be familiar with React (https://reactjs.org/) and how the state of a component is managed (https://reactjs.org/docs/state-and-lifecycle.html).

## What is MobX?

MobX is a state management solution, like Redux or Flux. Their main philosophy is that *"Anything that can be derived from the application state, should be derived. Automatically."*

### MobX's main parts

#### The store

We have the following class that acts as a store. The messages attribute is where the messages data will be stored, then used by the frontend. Each time the messages attribute will change, the methods marked with the @computed decorator will be called in order to update the functions that use them.

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

#### The reactions (observers)

A reaction is like a @computed value, but instead of returning a processed value, it does some internal stuff. For example a React component would re-render to show the correct data.

For example this React component is a reaction. Each time the store's data changes, the component updates:

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

The same applies to the following. If the message preview is clicked, the message becomes read and the store is updated. Yes, no actions or dispatching of events needed (although if you want to use them, MobX has support for actions too).

    // We can use also the observer() function like this. For stateless components this is the way to use, since @observer can be used only with classes
    const MessagePreview = observer(({message}) => (
      <div className={`message ${!message.read && 'read'}`} onClick={() => message.read = true}>
        <h2>{message.subject}</h2>
        <p>{message.description}</p>
      </div>
    ));
    
## Running the example

This is a **create-react-app** project, so you just need to do:

    npm install
    npm start

## Setting it up

For this example the setup that I did was:

- Use the create-react-app utility to get a React boilerplate
- Run **npm run eject**
- Install **mobx**, **mobx-react** and **@babel/plugin-proposal-decorators** (for enabling the decorator synthax):

        npm install mobx mobx-react --save
        npm install @babel/plugin-proposal-decorators --save-dev
    
- Add the following config as the last option of package.json:

        "babel": {
            "plugins": [
              ["@babel/plugin-proposal-decorators", {"legacy": true}]
            ],
            "presets": [
              "react-app"
            ]
        }
        
## Find out more

My example is very simple and covers only the basics of MobX. For more info you can check:

- The official documentation: https://mobx.js.org/index.html
- This ten-minute introduction: https://mobx.js.org/getting-started.html
- This simple example: https://jsfiddle.net/mweststrate/wv3yopo0/
- This egghead.io course: https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx

