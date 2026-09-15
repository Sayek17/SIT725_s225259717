# SIT725 Task 4.2P - Add a Database

RentLo units page, now backed by a MongoDB Atlas database instead of a
hardcoded array. The calculation that used to live in the sample data has
moved to the server.

RentLo is the trimester project from Task 3.1P, a monthly rent and utility
statement app for a five unit rental building. This task moves the owner's
units overview from Task 3.2P onto a real database.

## What changed since 3.2P

- The `unitList` array in `server.js` is gone. Each unit's monthly statement
  is now a document in a `unitstatements` collection, in a MongoDB Atlas
  cluster instead of a database running locally.
- Money is stored as `Decimal128`, in six separate bill fields (`rent`,
  `water`, `gas`, `meterCharge`, `electricity`, `miscellaneous`) plus a
  `previousDue` field, instead of one hardcoded total string.
- The total shown on each card is no longer stored. It is calculated on the
  server by `calculateUnitTotal()` in `utils/calculations.js`, a pure
  function kept outside the route so it can be tested on its own later.
- `GET /api/units` reads the statements with `UnitStatement.find({})` and
  maps each one into the same JSON shape the front end already used, so
  nothing in `public/` needed to change.
- `seed.js` populates the five units. There is no sample data left inside
  the app code itself.

## Database

MongoDB Atlas, free tier, not a local MongoDB install. The connection
string lives in a `.env` file that is not committed (see `.env.example`
for the variable name). `server.js` and `seed.js` both read it with
`dotenv`.

## How to run

```
cd 4.2P
npm install
cp .env.example .env
```

Then edit `.env` and put in a real MongoDB Atlas connection string.

```
npm run seed
npm start
```

Then open http://localhost:3000 in a browser. The endpoint can also be
called on its own:

```
curl http://localhost:3000/api/units
```

## Folder structure

```
4.2P/
  server.js                Express server, DB connection, GET /api/units
  seed.js                  Populates the unitstatements collection
  models/UnitStatement.js  Mongoose schema
  utils/calculations.js    calculateUnitTotal(), kept out of the route
  .env.example             Shape of the required .env file
  public/                  Unchanged from 3.2P
  screenshots/             Evidence for the report
```

## Notes

- "Do not copy the prac code exactly" applies to this task. The schema
  fields, the Atlas cloud database, the Decimal128 money fields and the
  calculation function are all different from the prac's Project schema
  and its plain hardcoded numbers.
- The `.env` file is gitignored at the repo root and is never pushed. A
  fresh clone needs its own `.env` with a working `MONGO_URI` before it
  will connect.

Author: Sayek, student ID 225259717
