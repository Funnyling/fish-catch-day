/* 
  StorePicker
  This will let us make <StorePicker/>
*/

import React from 'react';
import h from '../helpers';
import { withRouter } from 'react-router-dom';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    // get the data from the input
    const storeId = this.refs.storeId.value;
    this.props.history.push(null, '/store/' + storeId);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }
}

export default withRouter(StorePicker);
