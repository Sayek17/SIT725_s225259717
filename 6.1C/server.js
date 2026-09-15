// Starts the app built in app.js and listens for requests.

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port);
});
