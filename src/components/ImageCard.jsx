import React, { Component } from 'react';

const ImageCard = (props) => {
  function imageClickWrapper(e) {
    e.preventDefault();
    props.onClick(props.id, props.title);
  }

  return <img src={props.link} onClick={imageClickWrapper}/>
};


export default ImageCard;
