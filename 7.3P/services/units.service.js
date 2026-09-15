// Data access only, no business logic. The September 2026 statements for
// the five units are held here in memory, and this is the only place
// their payment status is ever changed, so the socket layer and the
// GET /api/units route always read the same live state.

const septemberStatements = [
    {
        unitNumber: 1,
        tenantName: "Daniel Reyes",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-1.jpg",
        bills: { rent: 1150.00, water: 62.00, gas: 48.00, meterCharge: 20.00, electricity: 105.00, miscellaneous: 35.00 },
        previousDue: 0,
        updatedAt: null
    },
    {
        unitNumber: 2,
        tenantName: "Mia Chen",
        paymentStatus: "Due",
        statementMonth: "September 2026",
        imagePath: "images/unit-2.jpg",
        bills: { rent: 1150.00, water: 58.50, gas: 44.00, meterCharge: 20.00, electricity: 98.00, miscellaneous: 15.00 },
        previousDue: 0,
        updatedAt: null
    },
    {
        unitNumber: 3,
        tenantName: "Aaron Silva",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-3.jpg",
        bills: { rent: 1250.00, water: 64.25, gas: 51.00, meterCharge: 20.00, electricity: 110.00, miscellaneous: 15.00 },
        previousDue: 0,
        updatedAt: null
    },
    {
        unitNumber: 4,
        tenantName: "Priya Nair",
        paymentStatus: "Due",
        statementMonth: "September 2026",
        imagePath: "images/unit-4.jpg",
        bills: { rent: 1080.00, water: 55.00, gas: 40.00, meterCharge: 20.00, electricity: 85.00, miscellaneous: 10.00 },
        previousDue: 45.00,
        updatedAt: null
    },
    {
        unitNumber: 5,
        tenantName: "Tom Becker",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-5.jpg",
        bills: { rent: 980.00, water: 51.75, gas: 38.00, meterCharge: 20.00, electricity: 76.00, miscellaneous: 10.00 },
        previousDue: 0,
        updatedAt: null
    }
];

// Hands back every unit statement, ordered by unit number.
function getAllStatements() {
    return septemberStatements;
}

// Finds one unit's statement by number, or null if it does not exist.
function getStatement(unitNumber) {
    return septemberStatements.find(s => s.unitNumber === unitNumber) || null;
}

// Flips one unit's payment status to whatever the caller decided it
// should be next, and stamps when the change happened.
function setPaymentStatus(unitNumber, status) {
    const statement = getStatement(unitNumber);
    if (!statement) {
        return null;
    }
    statement.paymentStatus = status;
    statement.updatedAt = new Date().toISOString();
    return statement;
}

module.exports = { getAllStatements, getStatement, setPaymentStatus };
