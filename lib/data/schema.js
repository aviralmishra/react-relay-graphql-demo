import {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql';

let Schema = (db) => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      albums: {
        type: new GraphQLList(albumType),
        resolve: () => db.collection('albums').find({}).toArray()
      }
    })
  });

  let albumType = new GraphQLObjectType({
    name: 'Album',
    fields: () => ({
      _id: {
        type: GraphQLString
      },
      id: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
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
      }
    })
  });

  let graphQLSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    })
  });

  return graphQLSchema;
};

export default Schema;
