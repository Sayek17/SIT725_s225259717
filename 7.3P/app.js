// Builds the Express app and exports it without starting a server.
// server.js wraps this in a raw HTTP server and attaches Socket.IO to
// that server, so app.js itself never has to know sockets exist.

const express = require('express');
const unitsRoutes = require('./routes/units.routes');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', unitsRoutes);

module.exports = app;
