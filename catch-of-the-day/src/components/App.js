import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  // sync app's state to the to the specific store's "fishes" database reference
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage (previous data before refresh)
    const localStorageRef = localStorage.getItem(params.storeid);
    if (localStorageRef) {
      this.setState({
        // local storage is a STRING right now, so we turn it back into an object with JSON.parse
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${params.storeid}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    // local storage is key/value pair. Here, key is the store ID, and value is our order in state (which is an object). But local storage is expecting a STRING, so we need to convert to a strong with JSON.stringify.
    localStorage.setItem(params.storeid, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    // 1.take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3. update state
    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };

  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove item from order. can use "delete" bc we are not mirroring in firebase -- firebase doesn't have the order anyway
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                fishDetails={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeid={this.props.match.params.storeid}
        />
      </div>
    );
  }
}

export default App;
