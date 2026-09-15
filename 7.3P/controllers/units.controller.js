// All the business logic for the units feature lives here. The routes
// file only maps a URL to one of these functions.

const unitsService = require('../services/units.service');
const { calculateUnitTotal } = require('../utils/calculations');

// Turns one stored statement into the card shape the front end expects.
// The total is worked out here rather than stored, so it is always
// current, and unitNumber is included so the client can address the
// right card and the right socket payload when its button is clicked.
function toCardShape(statement) {
    const bills = statement.bills;
    const total = calculateUnitTotal(bills, statement.previousDue);

    return {
        unitNumber: statement.unitNumber,
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

// GET /api/units - every unit with its calculated monthly total and its
// current payment status, which the payment board may have already
// changed since the server started.
function getAllUnits(req, res) {
    const data = unitsService.getAllStatements().map(toCardShape);
    res.json({ statusCode: 200, data: data, message: "Success" });
}

module.exports = { getAllUnits };
