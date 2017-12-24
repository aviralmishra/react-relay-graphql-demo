import React from 'react';
import Relay from 'react-relay/classic';

import Album from 'components/Album';

let Main = class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <h3>Albums</h3>
        <ul className="list-group">
          {
            this.props.store.albums.map((album) => {
              return <Album key={album._id} album={album}/>;
            })
          }
        </ul>
      </div>
    );
  }
};

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL `fragment on Store {albums {_id,  ${Album.getFragment(
      'album'
    )}}}`
  }
});

export default Main;
