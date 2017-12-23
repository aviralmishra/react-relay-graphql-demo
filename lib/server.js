import fs from 'fs';
import express from 'express';

import Schema from 'data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

import config from 'config';

const app = express();
app.use(express.static('public'));

(async () => {
  try {
    // Initialise database connection.
    let client = await MongoClient.connect(
      process.env.MONGO_REACT_FLUX_GRAPHQL_DB_URI
    );
    let db = client.db('react_flux_graphql_db');
    let schema = Schema(db);

    // Setup paths.
    app.use('/graphql', GraphQLHTTP({schema, graphiql: true}));

    // Start listening.
    app.listen(config.port, () => {
      console.info(`Listening on port ${config.port}`);
    });

    // Generate schema JSON. This is required for Relay.
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile(
      __dirname + '/data/schema.json',
      JSON.stringify(json, null, 2),
      err => {
        if (err) 
          throw err;
        
        console.info('JSON schema created.');
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
