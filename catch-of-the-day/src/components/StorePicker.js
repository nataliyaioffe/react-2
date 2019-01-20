import React, { Component } from "react";
import { getFunName } from "../helpers";

class StorePicker extends Component {

  myInput = React.createRef();

  goToStore = (e) => {
    //1. stop form from submittng
    e.preventDefault();
    //2. get text from input
    const storeName = this.myInput.current.value;
    //3. change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
