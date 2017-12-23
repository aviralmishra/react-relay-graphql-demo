import AppDispatcher from 'components/AppDispatcher';
import {ActionTypes} from 'components/Constants';

import {EventEmitter} from 'events';

class AlbumStore extends EventEmitter {
  _albums = [];

  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECEIVE_ALBUMS:
          this._albums = action.albums;
          this.emit('change');
          break;
        default:
          break;
      }
    });
  }

  getAll() {
    return this._albums;
  }
}

export default new AlbumStore();
