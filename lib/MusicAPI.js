import axios from 'axios';
import config from 'config';
import ServerActions from 'components/actions/ServerActions';

const MusicAPI = {
  async fetchAlbums() {
    const response = await axios.post(
      `http://${config.host}:${config.port}/graphql`,
      {query: `{
        albums {
          _id
          id
          title
          released
          art
          artistId,
          description
        }
      }`}
    );

    console.info('1: In API...', response);
    ServerActions.receiveAlbums(response.data.data.albums);
  }
};

export default MusicAPI;
