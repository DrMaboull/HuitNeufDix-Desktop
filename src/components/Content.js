// Content.js

import React, {Component} from 'react';
import fire from '../fire';
import { Layout } from 'antd';
import { Button } from 'react-bootstrap';

export default class Content extends Component {
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
            let out = { id: snapshot.key, place: snapshot.val().place, quantity: snapshot.val().quantity };
            this.setState({ list_out_of_stock: [out].concat(this.state.list_out_of_stock) });
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
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title"><b>Dashboard</b></h3>
                                    <h4>Ruptures de stock</h4>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <ul className="ul_out_of_stock">
                                                { /* Render the list of messages */
                                                    this.state.list_out_of_stock.map(
                                                        out =>
                                                            <li className="li_out_of_stock" key={out.id}>
                                                                <a href="#">
                                                                    <p className="li_content">Zone : {out.place}</p>
                                                                    <p className="li_content">Restant : {out.quantity}</p>
                                                                    <p className="li_content">
                                                                        <Button id={out.id} onClick={() => this.updateStock(out.id)} bsStyle="danger">Danger</Button>
                                                                    </p>
                                                                </a>
                                                        {/* <Button id={out.id} onClick={() => this.updateStock(out.id)}>{out.id}</Button>*/}
                                                    </li> 
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}