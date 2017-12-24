import React from 'react';
import Relay from 'react-relay/classic';

let Album = class Album extends React.Component {
  render() {
    let {album} = this.props;
    return (<li key={album.id} className="list-group-item">{album.title}</li>);
  }
};

Album = Relay.createContainer(Album, {
  fragments: {
    album: () => Relay.QL `
      fragment on Album {
        id
        title
      }
    `
  }
});

export default Album;
