/*
  Fish
  <Fish />
*/

import React from 'react';
import h from '../helpers';

class Fish extends React.Component {
  
  onButtonClick() {
    console.log("Going to add the fish: ", this.props.index);
    const key = this.props.index;
    this.props.addToOrder(key);
  }
  
  render() {
    const details = this.props.details;
    const isAvailable = details.status === 'available';
    const buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  }
}


export default Fish;
