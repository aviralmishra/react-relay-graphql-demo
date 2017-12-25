import {GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

let Schema = (db) => {
  class Store {}
  let store = new Store();

  let nodeDefs = nodeDefinitions((globalId) => {
    let {type} = fromGlobalId(globalId);
    if (type === 'Store') {
      return store;
    }
    return null;
  }, (obj) => {
    if (obj instanceof Store) {
      return storeType;
    }
    return null;
  });

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      id: globalIdField('Store'),
      albumConnection: {
        type: albumConnection.connectionType,
        args: {
          ...connectionArgs,
          query: {
            type: GraphQLString
          }
        },
        resolve: (_, args) => {
          let searchParams = {};

          if (args.query) {
            searchParams.title = new RegExp(args.query, 'i');
          }

          return connectionFromPromisedArray(
            db.collection('albums').find(searchParams).sort({createdAt: -1}).limit(args.first).toArray(),
            args
          );
        }
      }
    }),
    interfaces: [nodeDefs.nodeInterface]
  });

  let albumType = new GraphQLObjectType({
    name: 'Album',
    fields: () => ({
      _id: {
        type: GraphQLString
      },
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      released: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      art: {
        type: GraphQLString
      },
      artistId: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString,
        resolve: (o) => new Date(o.createdAt).toISOString()
      }
    })
  });

  let albumConnection = connectionDefinitions(
    {name: 'Album', nodeType: albumType}
  );

  let createAlbumMutation = mutationWithClientMutationId({
    name: 'CreateAlbum',

    inputFields: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      released: {
        type: GraphQLString
      },
      art: {
        type: GraphQLString
      },
      artistId: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    },

    outputFields: {
      albumEdge: {
        type: albumConnection.edgeType,
        resolve: (o) => ({node: o.ops[0], cursor: o.insertedId})
      },
      store: {
        type: storeType,
        resolve: () => store
      }
    },

    mutateAndGetPayload: ({
      id,
      title,
      released,
      art,
      artistId,
      description
    }) => {
      return db.collection('albums').insertOne({
        id,
        title,
        released,
        art,
        artistId,
        description,
        createdAt: Date.now()
      });
    }
  });

  let graphQLSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: nodeDefs.nodeField,
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({createAlbum: createAlbumMutation})
    })
  });

  return graphQLSchema;
};

export default Schema;
