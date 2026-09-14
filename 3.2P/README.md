# SIT725 Task 3.2P - Getting Graphical

RentLo units page. An Express web server that serves a Materialize front end,
where the unit cards are drawn on the client from data fetched from a REST endpoint.

RentLo is the trimester project from Task 3.1P. It prepares the monthly rent and
utility statement for a small five unit rental building. This page is the owner's
units overview.

## What it does

- Express serves everything in `public/` as static files.
- `GET /api/units` returns the five units as JSON in the shape
  `{ statusCode: 200, data: [...], message: "Success" }`.
- On page load the client calls that endpoint with jQuery `$.get`, hides the
  preloader and builds one Materialize card per unit.
- Each card shows the unit number, the tenant, a Paid or Due chip and the
  September total. Clicking the card reveals the bill breakdown.
- The "Log a bill entry" button opens a Materialize modal. Submitting the form
  prints the form data to the browser console and shows a toast.

## Materialize components used

Navbar, cards with card image, card reveal, chips, preloader, modal, select,
text inputs, buttons, toast, materialbox and the page footer.

## How to run

```
cd 3.2P
npm install
npm start
```

Then open http://localhost:3000 in a browser.

The endpoint can also be called on its own:

```
curl http://localhost:3000/api/units
```

## Folder structure

```
3.2P/
  server.js            Express server, sample data and the GET endpoint
  package.json
  public/
    index.html         Materialize page
    js/scripts.js      $.get call, card builder, modal form handler
    css/styles.css     custom styles
    images/            unit illustrations, banner and logo
  screenshots/         evidence for the report
```

## Notes

- Materialize 1.0.0 and jQuery 3.6.0 are loaded from a CDN.
- The unit images and the banner are simple flat illustrations made for this
  task, so there is no third party image licence to worry about.
- The data is a plain array inside `server.js`. Task 4.2P replaces it with a
  MongoDB collection without changing the front end.

Author: Sayek, student ID 225259717
