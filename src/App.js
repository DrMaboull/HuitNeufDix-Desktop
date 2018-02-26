import React, { Component } from 'react';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
          }
        </ul>
      </form>
    );
  }
}

export default App;



/*import React, { Component } from 'react';
import { Layout } from 'antd'
import fire from './fire';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(data => this.setState({ hits: data.movies }));
  }

  render() {
    const { hits } = this.state;
    return (
      <div className="App">
        <Layout>
          <Layout.Header>
            <h1 className="App-title">HuitNeufDix</h1>
          </Layout.Header>
          <Layout>
            <Layout.Content>
              <div className="div-list">
                {hits.map(hit =>
                  <div key={hit.objectID}>
                    <a href={hit.url}>{hit.title}</a>
                  </div>
                )}
              </div>
            </Layout.Content>
          </Layout>
        </Layout>
      </div>

    );

  }
}
export default App;
*/