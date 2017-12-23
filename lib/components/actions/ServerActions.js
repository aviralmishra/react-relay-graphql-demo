import AppDispatcher from 'components/AppDispatcher';
import {ActionTypes} from 'components/Constants';

const ServerActions = {
  receiveAlbums(albums) {
    AppDispatcher.dispatch({actionType: ActionTypes.RECEIVE_ALBUMS, albums});
  }
};

export default ServerActions;
