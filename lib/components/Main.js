import React from 'react';
import Relay from 'react-relay/classic';
import {debounce} from 'lodash';

import Album from 'components/Album';
import CreateAlbumMutation from 'mutations/CreateAlbumMutation';

let Main = class Main extends React.Component {
  state = {
    id: '',
    title: ''
  };

  constructor(props) {
    super(props);
    this.setVariables = debounce(this.props.relay.setVariables, 500);
  }

  search = (e) => {
    this.setVariables({query: e.target.value});
  };

  setLimit = (e) => {
    this.setVariables({limit: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    Relay.Store.commitUpdate(
      new CreateAlbumMutation({id: this.state.id, title: this.state.title, store: this.props.store})
    );

    this.setState({id: '', title: ''});
  }

  render() {
    return (
      <div>
        <h2>Albums</h2>

        <div className="input-field">
          <input id="search" type="text" onChange={this.search}/>
          <label htmlFor="search">Search Albums</label>
        </div>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Id"
              value={this.state.id}
              onChange={(event) => this.setState({id: event.target.value})}/>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={this.state.title}
              onChange={(event) => this.setState({title: event.target.value})}/>
          </div>
          <button className="btn btn-default" type="submit">Add</button>
        </form>

        <div className="row">
          <div className="col m12 hide-on-small-only">
            <div className="input-field">
              <select
                onChange={this.setLimit}
                defaultValue={this.props.relay.variables.limit}>
                <option value="2">List 2</option>
                <option value="4">List 4</option>
                <option value="100">List 100</option>
              </select>
            </div>
          </div>
        </div>

        <ul className="list-group">
          {
            this.props.store.albumConnection.edges.map((edge) => {
              return <Album key={edge.node.id} album={edge.node}/>;
            })
          }
        </ul>
      </div>
    );
  }
};
Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 100,
    query: ''
  },
  fragments: {
    store: () => Relay.QL `fragment on Store {id, albumConnection(first: $limit, query: $query) {edges {node {id,  ${Album.getFragment(
      'album'
    )}}}}}`
  }
});

export default Main;
