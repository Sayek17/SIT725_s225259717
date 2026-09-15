// Pure functions for RentLo statement math, kept out of the Express routes
// so the test suite can call them directly without starting a server.

// Turns a raw bill value into a safe number. A blank cell becomes 0 and
// text like "abc" becomes 0 instead of NaN, which is what a form field
// or a bad database value could otherwise produce.
function toSafeNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}

// Adds the six bill lines for a unit plus whatever was left owing from
// the previous month's statement.
function calculateUnitTotal(bills, previousDue) {
    const lines = [
        bills.rent,
        bills.water,
        bills.gas,
        bills.meterCharge,
        bills.electricity,
        bills.miscellaneous
    ];
    const linesTotal = lines.reduce((sum, value) => sum + toSafeNumber(value), 0);
    return linesTotal + toSafeNumber(previousDue);
}

module.exports = { calculateUnitTotal, toSafeNumber };
