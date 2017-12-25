import Relay from 'react-relay/classic';

class CreateAlbumMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL `
      mutation { createAlbum }
    `;
  }

  getVariables() {
    return {id: this.props.id, title: this.props.title};
  }

  getFatQuery() {
    return Relay.QL `
      fragment on CreateAlbumPayload {
        albumEdge,
        store { albumConnection }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'store',
        parentID: this.props.store.id,
        connectionName: 'albumConnection',
        edgeName: 'albumEdge',
        rangeBehaviors: {
          '': 'prepend'
        }
      }
    ];
  }

  getOptimisticResponse() {
    return {
      albumEdge: {
        node: {
          id: this.props.id,
          title: this.props.title
        }
      }
    };
  }
}

export default CreateAlbumMutation;
