import React, { Component } from 'react';

const Card = (props) => {
  const classes = props.selected ? 'imageCard selected' : 'imageCard';
  return <div className={ classes }>
    { props.children }
  </div>;
};

export default Card;
