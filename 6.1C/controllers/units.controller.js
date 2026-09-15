// All the business logic for the units feature lives here. The routes file
// only maps a URL to one of these functions.

const unitsService = require('../services/units.service');
const { calculateUnitTotal } = require('../utils/calculations');

// Turns one stored statement into the card shape the front end expects.
// The total is worked out here rather than stored, so it is always current.
function toCardShape(statement) {
    const bills = statement.bills;
    const total = calculateUnitTotal(bills, statement.previousDue);

    return {
        title: "Unit " + statement.unitNumber,
        image: statement.imagePath,
        tenant: statement.tenantName,
        status: statement.paymentStatus,
        total: total.toFixed(2),
        link: "View " + statement.statementMonth + " statement",
        description: "Rent: " + bills.rent.toFixed(2) +
            ", Water bill: " + bills.water.toFixed(2) +
            ", Gas bill: " + bills.gas.toFixed(2) +
            ", Water meter charge: " + bills.meterCharge.toFixed(2) +
            ", Electricity bill: " + bills.electricity.toFixed(2) +
            ", Others bill: " + bills.miscellaneous.toFixed(2) + "."
    };
}

// GET /api/units - every unit with its calculated monthly total.
function getAllUnits(req, res) {
    const data = unitsService.getAllStatements().map(toCardShape);
    res.json({ statusCode: 200, data: data, message: "Success" });
}

// POST /api/total - works out one unit's total from bills sent in the body.
// This is the owner's grid asking the server to add a row up for it.
function getUnitTotal(req, res) {
    const bills = req.body.bills;

    if (!bills || typeof bills !== 'object') {
        return res.status(400).json({ statusCode: 400, data: {}, message: "Bills are required" });
    }

    const total = calculateUnitTotal(bills, req.body.previousDue);
    res.json({ statusCode: 200, data: { total: total.toFixed(2) }, message: "Success" });
}

module.exports = { getAllUnits, getUnitTotal };
