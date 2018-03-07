import React, { Component } from 'react';
import fire from './fire';
import "./App.css";

import { Layout, Button } from 'antd'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { list_out_of_stock: [] };
    }

    /**
     * Launched at the beginning of the component life
     * Get all out of stock elements
     */
    componentWillMount() {
        fire.database().ref('stocked').orderByChild("in_stock").equalTo(0).on('child_added', snapshot => {
            let out = { id: snapshot.key, text: snapshot.val().place };
            this.setState({ list_out_of_stock: [out].concat(this.state.list_out_of_stock) });
            //console.log(this.state.list_out_of_stock);
        })
    }

    /**
     * Update stock by the key of an item
     * Put it in stock changing quantity of in_stock boolean
     * @param {*} id 
     */
    updateStock(id) {
        let quantity;
        fire.database().ref('stocked').orderByKey().equalTo(id).on('child_added', snapshot => {
            quantity = { text: snapshot.val().quantity};
            fire.database().ref('stocked').child(id).update({
                '/in_stock': 1,
                '/quantity': quantity.text + 50
            })
        })
        
        this.updateState(id);
        /*list_out_of_stock.indexOf()
        this.setState({list_out_of_stock: [this.state.list_out_of_stock.splice()]});*/
    }

    /**
     * Update state variable, delete current out of stock item
     * @param {*} id 
     */
    updateState(id) {
        let copy = this.state.list_out_of_stock;
        copy.forEach(element => {
            if (element.id === id) {
                copy.splice(copy.indexOf(element), 1);
                this.setState({ list_out_of_stock: copy });
                return;
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Layout.Header>
                        <h1 className="App-title">HuitNeufDix</h1>
                    </Layout.Header>
                    <Layout>
                        <Layout.Content>
                            <div className="div-list">
                                <ul>
                                    { /* Render the list of messages */
                                        this.state.list_out_of_stock.map(
                                            out => <li key={out.id}>{out.text}
                                                <Button id={out.id} onClick={() => this.updateStock(out.id)}>{out.id}</Button></li>
                                        )
                                    }
                                </ul>
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </div>
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