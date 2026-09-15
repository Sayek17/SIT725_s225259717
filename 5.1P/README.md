# SIT725 Task 5.1P - Using MVC Strategy

A minimal read-only Books catalog built with the MVC structure from the week 5
prac. The request path is routes to controllers to services, with a plain
HTML/CSS/JavaScript client in the `public` folder.

The five books are held in an in-memory array inside the service, so this task
does not use a database.

## Run it

```
cd 5.1P
npm install
npm run start
```

Then open http://localhost:3000 in a browser. The page fetches the catalog by
itself as soon as it loads and lists each book's title and author.

If port 3000 is already taken, start it on another port:

```
PORT=5725 npm run start
```

## Endpoints

| Method | URL | What it returns |
| --- | --- | --- |
| GET | /api/books | all five books, as `{ "data": [ ... ] }` |
| GET | /api/books/:id | one book by its id, b1 to b5, as `{ "data": { ... } }` |

An id that does not exist returns status 404 and `{ "message": "Book not found" }`.

## Files

- `server.js` - creates the Express server, serves the public folder, mounts the books router
- `routes/books.routes.js` - maps the two GET paths to controller functions, no logic
- `controllers/index.js` - folder entry point, so routes can require the folder
- `controllers/books.controller.js` - reads the request, calls the service, sends the JSON response
- `services/books.service.js` - holds the books array and the two lookup functions
- `public/index.html` - the page and the script that fetches and renders the list
- `public/style.css` - page styles
- `package.json` - project details, the express dependency and the start script
- `screenshots/` - evidence for the OnTrack submission

## How a request flows

The browser loads `index.html`, the script calls `/api/books`, `server.js` hands
the request to the router, the router calls the controller, the controller calls
the service, the service returns the array, and the controller sends it back as
JSON for the page to render.

Each layer has one job, which is the point of the MVC split. If the books were
ever moved into a database, only `services/books.service.js` would change and
the routes and controller would stay as they are.

## Notes

Only Node.js, Express and plain HTML, CSS and JavaScript are used. No frontend
frameworks or UI libraries are included, so there is no Materialize or jQuery in
this task.

Author: Sayek, student ID 225259717
