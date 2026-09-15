# SIT725 Task 5.2C - MVC + Database

The Books catalogue from Task 5.1P, moved onto MongoDB. The MVC layers are the
same as 5.1P. Only the service changed, from reading a plain array to querying
the database, plus a new model and a seed script.

There is no sample data left anywhere in the application code. The five books
live in the database, and `scripts/seed.js` is the only place the sample values
appear.

## Run it

MongoDB has to be running locally first, on the default port 27017.

```
cd 5.2C
npm install
npm run seed
npm run start
```

Then open http://localhost:3000 in a browser. Press "Get all books" to load the
catalogue, then click a book in the list to see its full details.

## Database

Local MongoDB, database name `booksdb`, collection `books`. The connection
string `mongodb://localhost:27017/booksdb` is written directly in `server.js`
and in `scripts/seed.js`, so both point at the same database.

The price is stored as `Decimal128` so the cents cannot drift the way they can
with floating point numbers. `Decimal128` does not serialise to a number on its
own, it comes out as `{ "$numberDecimal": "22" }`, so the schema has a getter
that turns it into a string and `toJSON` is set to run getters. The service
returns Mongoose documents rather than lean objects, because a lean object skips
the getters.

## Endpoints

| Method | URL | What it returns |
| --- | --- | --- |
| GET | /api/books | all five books |
| GET | /api/books/:id | one book by its id, b1 to b5 |

Both reply in the shape the week 5 practical uses:

```
{ "statusCode": 200, "data": ..., "message": "..." }
```

An id that does not exist returns status 404 and `Book not found`.

## Files

- `server.js` - creates the Express server, connects to MongoDB, serves the public folder, mounts the books router
- `models/Book.js` - the Mongoose schema, including the Decimal128 price
- `services/books.service.js` - the database queries, and nothing else
- `controllers/books.controller.js` - reads the request, calls the service, sends the JSON response
- `controllers/index.js` - entry point for the folder, so the routes file can require the controllers folder
- `routes/books.routes.js` - maps the two GET paths to controller functions, no logic
- `scripts/seed.js` - clears the collection and inserts the five books with their prices
- `public/index.html` - the page, the button and the script that fetches and renders
- `public/style.css` - page styles
- `package.json` - project details, the dependencies and the start and seed scripts
- `screenshots/` - evidence for the OnTrack submission

## What changed from 5.1P

The routes, the controller shape and the folder layout are the same. The array
that used to sit in `services/books.service.js` is gone, replaced by
`Book.find({})` and `Book.findOne({ id })`. That is the point of keeping the
layers apart, the data source can change without touching the routes.

The client page changed because this task asks for different behaviour. The
catalogue now loads on a button press instead of on page load, the list shows
the title and the price, and clicking a book shows all of its details.

## Notes

Only Node.js, Express, Mongoose and plain HTML, CSS and JavaScript are used. No
frontend frameworks or UI libraries.

Author: Sayek, student ID 225259717
