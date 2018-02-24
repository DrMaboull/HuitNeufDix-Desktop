import React, { Component } from 'react';
import { Layout } from 'antd'
import firebase from 'firebase'
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
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
        <script>
          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyAEmyharILrgtF8tLi7k5vaRSyEDPCh26c",
            authDomain: "huitneufdix-123456.firebaseapp.com",
            databaseURL: "https://huitneufdix-123456.firebaseio.com",
            projectId: "huitneufdix-123456",
            storageBucket: "",
            messagingSenderId: "122149889685"
          };
        firebase.initializeApp(config);

</script>
      </div>

    );

  }
}
export default App;
