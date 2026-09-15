// Routes map a URL to a controller function and do nothing else. The
// /api prefix is added once, in app.js, so the path here stays relative.
// The POST /api/total route from 6.1C is gone; the payment board's write
// path is now the paymentReceived socket event, not an HTTP endpoint.

const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/units', Controllers.unitsController.getAllUnits);

module.exports = router;
