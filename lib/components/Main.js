import React from 'react';
import Relay from 'react-relay/classic';
import PropTypes from 'prop-types';

let Main = class Main extends React.PureComponent {
  static propTypes = {
    limit: PropTypes.number
  };

  static defaultProps = {
    limit: 3
  };

  render() {
    return (
      <div>
        <h3>Albums</h3>
        <ul className="list-group">
          {
            this.props.store.albums.slice(0, this.props.limit).map((album) => {
              return <li key={album.id} className="list-group-item">{album.title}</li>;
            })
          }
        </ul>
      </div>
    );
  }
};

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL `
    fragment on Store {
      albums {
        id
        title
      }
    }
    `
  }
});

export default Main;
