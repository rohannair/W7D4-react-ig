import React, { Component } from 'react';

class ImageCard extends Component {
  render() {
    return (
      <div className="imageCard">
        <img src={this.props.link} />
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default ImageCard;
