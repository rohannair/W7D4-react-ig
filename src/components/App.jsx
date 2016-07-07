import React from 'react';
import fetch from 'isomorphic-fetch';

import ImageCard from './ImageCard.jsx';

import styles from '../css/app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  };

  componentDidMount() {
    this._callApi();
  };

  render() {
    const childData = this.state.data.length > 0
    ? this.state.data.map(val => <ImageCard key={ val.id } link={ val.link } title={ val.title } />)
    : 'Loading...';

    return (
      <div className="app">
        { childData }
      </div>
    )
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
