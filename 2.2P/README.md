# SIT725 Task 2.2P - Express Web Server

A simple Express web server that serves a static web page from the `public` folder and
provides a web service that adds two numbers.

## Run it

```
cd 2.2P
npm install
npm run start
```

Then open http://localhost:3000 in a browser.

## Endpoints

| Method | URL | How the numbers are sent |
| --- | --- | --- |
| GET | /api/add?num1=12&num2=4 | in the URL as a query string |
| POST | /api/add | in a JSON body: {"num1":12,"num2":4} |

Both reply with the same JSON:

```
{ "num1": 12, "num2": 4, "result": 16 }
```

## Files

- `server.js` - creates the Express server, serves the public folder, defines the two routes
- `package.json` - project details, the express dependency and the start script
- `public/index.html` - the web page
- `public/js/scripts.js` - reads the inputs and calls the API with fetch
- `public/css/styles.css` - page styles
- `screenshots/` - evidence for the OnTrack submission
