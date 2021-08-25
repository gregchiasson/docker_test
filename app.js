'use strict';

const express = require('express');
const api     = require('api_base');
const app     = express();

// Constants
const ARGS = process.argv;
const PORT = ARGS.length >= 3 ? ARGS[2] : 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
  res.send('Hello GUFF!!!');
});

// TODO: add endpoints by class, have them expose their own methods

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
