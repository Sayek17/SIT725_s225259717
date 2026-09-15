// Routes map a URL to a controller function and do nothing else. The /api
// prefix is added once, in app.js, so the paths here stay relative.

const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/units', Controllers.unitsController.getAllUnits);
router.post('/total', Controllers.unitsController.getUnitTotal);

module.exports = router;
