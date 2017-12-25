import React from 'react';
import Relay from 'react-relay/classic';
import moment from 'moment';

let Album = class Album extends React.Component {
  dateLabel = () => {
    let {album, relay} = this.props;
    if (relay.hasOptimisticUpdate(album)) {
      return 'Saving...';
    }
    return moment(album.createdAt).format('ll');
  };

  render() {
    let {album} = this.props;
    return (
      <li key={album.id} className="list-group-item">
        {this.dateLabel(album.createdAt)}: {album.title}
      </li>
    );
  }
};

Album = Relay.createContainer(Album, {
  fragments: {
    album: () => Relay.QL `
      fragment on Album {
        id
        title
        createdAt
      }
    `
  }
});

export default Album;
