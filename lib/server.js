import express from 'express';
import {MongoClient} from 'mongodb';

import config from 'config';

const app = express();

app.use(express.static('public'));

let db;
console.info(process.env.MONGO_REACT_FLUX_GRAPHQL_DB_URI);

MongoClient.connect(
  process.env.MONGO_REACT_FLUX_GRAPHQL_DB_URI,
  (err, client) => {
    if (err) 
      throw err;
    
    db = client.db('react_flux_graphql_db');

    app.listen(config.port, () => {
      console.info(`Listening on port ${config.port}`);
    });
  }
);

app.get('/data/albums', async (req, res) => {
  db.collection('albums').find({}).toArray((err, albums) => {
    if (err) 
      throw err;
    
    res.json(albums);
  });
});

app.get('/data/artists', async (req, res) => {
  db.collection('artists').find({}).toArray((err, artists) => {
    if (err) 
      throw err;
    
    res.json(artists);
  });
});
