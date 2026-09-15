// Requiring the controllers folder lands here, so a routes file can write
// require('../controllers') and reach every controller from one place.

const unitsController = require('./units.controller');

module.exports = { unitsController };
