/*
  App
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';

// Firebase
import Rebase from 're-base';
const base = Rebase.createClass('https://catch-of-the-day.firebaseio.com/');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes : {},
      order : {}
    };
  }

  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes'
    });

    const localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if (localStorageRef) {
      // update our component state to reflect what is in localStorage
      this.setState({
        order : JSON.parse(localStorageRef)
      });
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
  }

  removeFromOrder(key){
    delete this.state.order[key];
    this.setState({
      order : this.state.order
    });
  }

  addFish(fish) {
    const timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({ fishes : this.state.fishes });
  }

  removeFish(key) {
    if (confirm("Are you sure you want to remove this fish?!")) {
      this.state.fishes[key] = null;
      this.setState({
        fishes : this.state.fishes
      });
    }
  }

  loadSamples() {
    this.setState({
      fishes : require('../sample-fishes')
    });
  }

  renderFish(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>  
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish} {...this.props}/>
      </div>
    )
  }

}

export default withRouter(App);
