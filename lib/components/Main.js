import React from 'react';
import MusicAPI from 'MusicAPI';
import AlbumStore from 'components/stores/AlbumStore';

const _getAppState = () => {
  return {albums: AlbumStore.getAll()};
};

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = _getAppState();

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    MusicAPI.fetchAlbums();
    AlbumStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    AlbumStore.removeListener('change', this.onChange);
  }

  onChange() {
    console.info('4. In view');
    this.setState(_getAppState());
  }

  render() {
    return (
      <div>
        <h3>Albums</h3>
        <ul className="list-group">
          {
            this.state.albums.map((album) => {
              return <li key={album.id} className="list-group-item">{album.title}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default Main;
