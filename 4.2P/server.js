require('dotenv').config();
var express = require("express")
var app = express()
const mongoose = require('mongoose');
const UnitStatement = require('./models/UnitStatement');
const { calculateUnitTotal, toSafeNumber } = require('./utils/calculations');

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error: ' + err.message);
});

// Mongoose returns Decimal128 objects, not plain numbers. This reads each
// bill field back out as a normal number before any math is done on it.
function billsAsNumbers(bills) {
    return {
        rent: toSafeNumber(bills.rent ? bills.rent.toString() : 0),
        water: toSafeNumber(bills.water ? bills.water.toString() : 0),
        gas: toSafeNumber(bills.gas ? bills.gas.toString() : 0),
        meterCharge: toSafeNumber(bills.meterCharge ? bills.meterCharge.toString() : 0),
        electricity: toSafeNumber(bills.electricity ? bills.electricity.toString() : 0),
        miscellaneous: toSafeNumber(bills.miscellaneous ? bills.miscellaneous.toString() : 0)
    };
}

// Builds the same JSON shape the 3.2P front end already expects, so the
// client code in public/ does not have to change at all.
function toCardShape(doc) {
    const bills = billsAsNumbers(doc.bills);
    const previousDue = toSafeNumber(doc.previousDue ? doc.previousDue.toString() : 0);
    const total = calculateUnitTotal(bills, previousDue);

    return {
        title: "Unit " + doc.unitNumber,
        image: doc.imagePath,
        tenant: doc.tenantName,
        status: doc.paymentStatus,
        total: total.toFixed(2),
        link: "View " + doc.statementMonth + " statement",
        description: "Rent: " + bills.rent.toFixed(2) +
            ", Water bill: " + bills.water.toFixed(2) +
            ", Gas bill: " + bills.gas.toFixed(2) +
            ", Water meter charge: " + bills.meterCharge.toFixed(2) +
            ", Electricity bill: " + bills.electricity.toFixed(2) +
            ", Others bill: " + bills.miscellaneous.toFixed(2) + "."
    };
}

app.get('/api/units', async (req, res) => {
    try {
        const statements = await UnitStatement.find({}).sort({ unitNumber: 1 }); //fetch from databse
        const data = statements.map(toCardShape); //prepare the response for the cards -> call calculation function
        res.json({ statusCode: 200, data: data, message: "Success" })
    } catch (err) {
        res.status(500).json({ statusCode: 500, data: [], message: "Could not load units" })
    }
})

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})
