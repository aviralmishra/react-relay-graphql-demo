import {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql';

let Schema = (db) => {
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
        albums: {
          type: new GraphQLList(albumType),
          resolve: () => db.collection('albums').find({}).toArray()
        }
      })
    })
  });

  return graphQLSchema;
};

export default Schema;
