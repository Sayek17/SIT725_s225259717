// Starts the app built in app.js and attaches Socket.IO to the same HTTP
// server. Socket.IO needs the raw http server, not the Express app, so
// http.listen() replaces app.listen() here, matching the Workshop 7
// pattern (http.createServer(app), then require('socket.io')(http)).

const http = require('http').createServer(require('./app'));
const io = require('socket.io')(http);
const registerPaymentSocket = require('./sockets/payments.socket');

registerPaymentSocket(io);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log("App listening to: " + port);
});
