import express from 'express';
import config from 'config';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}`);
});
