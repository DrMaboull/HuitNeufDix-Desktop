// SideBar.js

import React, {Component} from 'react';
import fire from '../fire';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { progressing: [], done: [] };
    }

    /**
     * Launched at the beginning of the component life
     * Get all out of stock elements
     */
    componentWillMount() {
        fire.database().ref('journeys').orderByChild("done").equalTo(0).on('child_added', snapshot => {
            let progressing_var = { id: snapshot.key };
            this.setState({ progressing: [progressing_var].concat(this.state.progressing) });
        })
        fire.database().ref('journeys').orderByChild("done").equalTo(1).on('child_added', snapshot => {
            let done_var = { id: snapshot.key };
            this.setState({ done: [done_var].concat(this.state.done) });
        })
    }

    // componentDidMount() {
    //     fire.database().ref('journeys').orderByChild("done").equalTo(0).on('child_added', snapshot => {
    //         let progressing_var = { id: snapshot.key };
    //         this.setState({ progressing: [progressing_var].concat(this.state.progressing) });
    //     })
    //     fire.database().ref('journeys').orderByChild("done").equalTo(1).on('child_added', snapshot => {
    //         let done_var = { id: snapshot.key };
    //         this.setState({ done: [done_var].concat(this.state.done) });
    //     })
    // }

    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Remy Vilaplana</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">
                            Liste des tournées
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-files-o"></i>
                                <span>En Cours</span>
                                <span className="pull-right-container">
                                <span className="label label-primary pull-right">{this.state.progressing.length}</span>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                            { /* Render the list of messages */
                                this.state.progressing.map(
                                    temp => <li key={temp.id} className="sidebar_li"><i className="fa fa-circle-o"></i> {temp.id}</li>
                                )
                            }
                            </ul>
                        </li>

                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-files-o"></i>
                                <span>Terminées</span>
                                <span className="pull-right-container">
                                <span className="label label-primary pull-right">{this.state.done.length}</span>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                            { /* Render the list of messages */
                                this.state.done.map(
                                    temp => <li key={temp.id} className="sidebar_li"><i className="fa fa-circle-o"></i> {temp.id}</li>
                                )
                            }
                            </ul>
                        </li>
                        {/* <li>
                        <a href="pages/widgets.html">
                            <i className="fa fa-th"></i> <span>Widgets</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green">new</small>
                            </span>
                        </a>
                        </li>
                        <li className="treeview">
                        <a href="#">
                            <i className="fa fa-pie-chart"></i>
                            <span>Charts</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o"></i> ChartJS</a></li>
                            <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                            <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                            <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
                        </ul>
                        </li>
                        <li>
                        <ul className="treeview-menu">
                            <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o"></i> Simple tables</a></li>
                            <li><a href="pages/tables/data.html"><i className="fa fa-circle-o"></i> Data tables</a></li>
                        </ul>
                        </li>
                        <li>
                        <a href="pages/calendar.html">
                            <i className="fa fa-calendar"></i> <span>Calendar</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-red">3</small>
                            <small className="label pull-right bg-blue">17</small>
                            </span>
                        </a>
                        </li>
                        <li>
                        <a href="pages/mailbox/mailbox.html">
                            <i className="fa fa-envelope"></i> <span>Mailbox</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-yellow">12</small>
                            <small className="label pull-right bg-green">16</small>
                            <small className="label pull-right bg-red">5</small>
                            </span>
                        </a>
                        </li> */}
                    </ul>
                </section>
            </aside> 
        )
    }
}