'use strict';

const express = require('express');
const api     = require('./lib/api_base.js');

// Constants
const ARGS = process.argv;
const PORT = ARGS.length >= 3 ? ARGS[2] : 3000;
const HOST = '0.0.0.0';
const app     = express();
const PREFIX  = 'api';

// endpoints
const items = require('./lib/api_items');

api.logger('INFO', 'starting up...');

app.use(express.json());

// App
app.get('/', (req, res) => {
  res.json(['hello', 'world']);
});

// add endpoints by class, have them expose their own methods
var dbh = 'ok';
const items_api = new items() 
items_api.register(PREFIX, app);

const base_api = new api();
base_api.default_routes(app);

app.listen(PORT, HOST);
api.logger('INFO', 'Running on port ' + PORT);
