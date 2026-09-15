# SIT725 Task 7.3P - Socket Programming

A live payment board for RentLo, built on top of the Task 6.1C units page.
The owner marks a unit's rent as received on its card, and every open
browser updates straight away, chip, button and building total, with no
refresh and no polling.

Follows the architecture shown in Workshop 7: `http.createServer(app)`
wrapped by `require('socket.io')(http)`, with Express and Socket.IO
sharing one port. The variation asked for is different events, data, UI
behaviour and use case. This app emits from the client as well as the
server, broadcasts to every connection with `io.emit` instead of pushing
to one socket, drives the numbers from a real calculation instead of
`Math.random()`, and has no per-connection timer to leak.

## Run it

\`\`\`
npm install
npm start
\`\`\`

Open http://localhost:3000 in two browser tabs, or two different
browsers, side by side. Click "Payment Received" on a card in one tab.
Its chip, its button, the outstanding total above the grid, and the
activity feed below the grid all update in the other tab with no
refresh.

## Socket events

| Event | Direction | Payload | What it does |
| --- | --- | --- | --- |
| `paymentReceived` | client to server | `{ unitNumber }` | Sent when a card's button is clicked |
| `statementUpdated` | server to all clients | `{ unitNumber, status, outstanding, updatedAt }` | Repaints that unit's chip and button, and the outstanding total |
| `activity` | server to all clients | `{ message, at }` | Appends one line to the live activity feed |

`connection` and `disconnect` are also logged on the server for every
socket.

## Endpoints

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/api/units` | `{ statusCode, data, message }`, all five units with their current payment status and total, calculated fresh on every request |

The `POST /api/total` endpoint from 6.1C is not carried over. The
payment board's write path is the `paymentReceived` socket event, not an
HTTP request.

## Files

- `server.js` - creates the HTTP server, attaches Socket.IO to it, and starts listening. `app.listen()` from 6.1C is replaced with `http.listen()` here because Socket.IO needs the raw HTTP server, not the Express app.
- `app.js` - builds and exports the Express app, unchanged from 6.1C.
- `sockets/payments.socket.js` - all Socket.IO connection and event handling: `paymentReceived` in, `statementUpdated` and `activity` broadcast out to everyone.
- `routes/units.routes.js` - maps `GET /api/units` to the controller, nothing else.
- `controllers/units.controller.js` - turns a stored statement into the card shape the front end expects.
- `services/units.service.js` - holds the five September statements in memory and `setPaymentStatus`, the only place that state is changed.
- `utils/calculations.js` - `calculateUnitTotal` carried over from 6.1C, plus `calculateOutstanding`, which sums the total still owed across every unit marked Due.
- `public/` - the card grid, the outstanding total badge, the live activity feed, and `js/scripts.js`, which opens the socket, emits `paymentReceived` on a button click, and repaints from `statementUpdated` and `activity`.

## Author

Sayek, student ID 225259717
