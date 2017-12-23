import express from 'express';
import GraphQLHTTP from 'express-graphql';
import {MongoClient} from 'mongodb';

import Schema from 'data/schema';

import config from 'config';

const app = express();

app.use(express.static('public'));

let db;

MongoClient.connect(
  process.env.MONGO_REACT_FLUX_GRAPHQL_DB_URI,
  (err, client) => {
    if (err) 
      throw err;
    
    db = client.db('react_flux_graphql_db');

    app.use('/graphql', GraphQLHTTP({schema: Schema(db), graphiql: true}));

    app.listen(config.port, () => {
      console.info(`Listening on port ${config.port}`);
    });
  }
);
