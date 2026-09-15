// Builds the Express app and exports it without starting a server. Keeping
// listen() out of this file is what lets the test suite load the app and
// call its routes directly, with no server running beside it.

const express = require('express');
const unitsRoutes = require('./routes/units.routes');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', unitsRoutes);

module.exports = app;
