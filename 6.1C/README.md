# SIT725 Task 6.1C - Testing Your Code

The RentLo units page from the earlier weeks, imported into a week 6 folder
and given an automated test suite built with Mocha and Chai.

RentLo is the trimester project from Task 3.1P, a monthly rent and utility
statement app for a five unit rental building. This task is about testing,
so the app itself is kept small and the work went into the tests.

## What this project has to test

The task asks for two backend features that can be tested.

- A calculation function. `calculateUnitTotal()` in `utils/calculations.js`
  adds a unit's six bill lines plus anything still owing from last month.
  It is a pure function outside the routes, so a test can call it on its own.
- A REST API endpoint. `GET /api/units` returns every unit with its total,
  and `POST /api/total` adds up a set of bills sent in the request body.

## Why the data is held in memory

Task 4.2P put this data in MongoDB and Task 5.2C used a local MongoDB.
Here the five statements live in `services/units.service.js` instead. That
keeps the test suite self contained, so `npm test` passes on a fresh clone
with no database to install, seed or keep running.

## Why app.js and server.js are separate

`app.js` builds the Express app and exports it. `server.js` is the only
file that calls `listen()`. Splitting them lets the tests load the app and
send requests straight to it with Supertest, so there is no second terminal
running a server while the tests go.

## Run it

```
cd 6.1C
npm install
npm start
```

Then open http://localhost:3000 in a browser.

## Run the tests

```
cd 6.1C
npm install
npm test
```

Mocha picks up every file in the `test` folder. Nothing else needs to be
running.

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| GET | /api/units | Every unit with its calculated monthly total |
| POST | /api/total | Adds up the bills sent in the body and returns the total |

`POST /api/total` expects a body like this:

```
{ "bills": { "rent": 1080, "water": 55, "gas": 40, "meterCharge": 20, "electricity": 85, "miscellaneous": 10 }, "previousDue": 45 }
```

It answers 400 if the bills are missing.

## Test cases

| # | File | Covers | What it checks |
| --- | --- | --- | --- |
| 1 | calculations.test.js | Valid | The six bills plus the previous amount due come to 1335.00 |
| 2 | calculations.test.js | Invalid | A bill of "abc" counts as zero, so the total is never NaN |
| 3 | calculations.test.js | Edge | Bills sent as text add up, and a blank cell counts as zero |
| 4 | api.test.js | Valid | GET /api/units answers 200 with all five units |
| 5 | api.test.js | Valid | POST /api/total returns the right total for a set of bills |
| 6 | api.test.js | Invalid | POST /api/total answers 400 when no bills are sent |

## Files

```
app.js                        Builds the Express app and exports it
server.js                     Starts the app and listens on port 3000
routes/units.routes.js        Maps the two URLs to controller functions
controllers/index.js          Barrel so routes can require one folder
controllers/units.controller.js  The logic behind both endpoints
services/units.service.js     The five unit statements, held in memory
utils/calculations.js         calculateUnitTotal() and toSafeNumber()
test/calculations.test.js     Three tests for the calculation function
test/api.test.js              Three tests for the REST endpoints
public/                       The units page, carried over unchanged
screenshots/                  Evidence for the report
```

## Packages

Express for the server. Mocha, Chai and Supertest as development
dependencies only, so they are not shipped with the app.

Chai is pinned to version 4. Version 5 onwards is ESM only and cannot be
loaded with `require`, which is how the practical writes its tests.

Author: Sayek, student ID 225259717
