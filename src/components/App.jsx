import React from 'react';
import fetch from 'isomorphic-fetch';

import Card from './Card.jsx';
import ImageCard from './ImageCard.jsx';
import Title from './Title.jsx';

import styles from '../css/app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedImage: null
    }
  };

  componentDidMount() {
    this._callApi();
  };

  render() {
    const { selectedImage } = this.state;
    console.info('-------- State', this.state);

    const childData = this.state.data.length > 0
    ? this.state.data.map(val =>
      <Card key={ val.id } selected={ selectedImage === val.id }>
        <Title>{val.title}</Title>
        <ImageCard link={ val.link } title={val.title} id={val.id} onClick={this._imageClickHandler} />
      </Card>)
    : 'Loading...';

    return (
      <div className="app">
        { childData }
      </div>
    )
  };

  _imageClickHandler = (id, title) => {
    console.log(`Image ${title} was clicked`);

    this.setState({
      ...this.state,
      selectedImage: id
    })
  };

  _callApi = () => {
    const self = this;

    fetch('https://api.imgur.com/3/gallery/t/toronto/time?perPage=5', {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID cce4066271f7cd3'
      }
    })
    .then(data => data.json())
    .then(data => {
      const ourData = data.data.items
        .filter(val => !val.nsfw && val.link.indexOf('.jpg') > 0)
        .map(val => {
          return {
            link: val.link,
            id: val.id,
            title: val.title
          }
        });

      console.log('-------- Our Data', ourData);
      self.setState({
        data: ourData
      });

    })
    .catch(err => console.error(err));
  }


}

export default App;
