require('dotenv').config();
const mongoose = require('mongoose');
const UnitStatement = require('./models/UnitStatement');

// September 2026 statements for the five units. Unit 4 carries a
// previous due forward, which is what exercises that part of the total.
const septemberStatements = [
    {
        unitNumber: 1,
        tenantName: "Daniel Reyes",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-1.jpg",
        bills: { rent: 1150.00, water: 62.00, gas: 48.00, meterCharge: 20.00, electricity: 105.00, miscellaneous: 35.00 },
        previousDue: 0
    },
    {
        unitNumber: 2,
        tenantName: "Mia Chen",
        paymentStatus: "Due",
        statementMonth: "September 2026",
        imagePath: "images/unit-2.jpg",
        bills: { rent: 1150.00, water: 58.50, gas: 44.00, meterCharge: 20.00, electricity: 98.00, miscellaneous: 15.00 },
        previousDue: 0
    },
    {
        unitNumber: 3,
        tenantName: "Aaron Silva",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-3.jpg",
        bills: { rent: 1250.00, water: 64.25, gas: 51.00, meterCharge: 20.00, electricity: 110.00, miscellaneous: 15.00 },
        previousDue: 0
    },
    {
        unitNumber: 4,
        tenantName: "Priya Nair",
        paymentStatus: "Due",
        statementMonth: "September 2026",
        imagePath: "images/unit-4.jpg",
        bills: { rent: 1080.00, water: 55.00, gas: 40.00, meterCharge: 20.00, electricity: 85.00, miscellaneous: 10.00 },
        previousDue: 45.00
    },
    {
        unitNumber: 5,
        tenantName: "Tom Becker",
        paymentStatus: "Paid",
        statementMonth: "September 2026",
        imagePath: "images/unit-5.jpg",
        bills: { rent: 980.00, water: 51.75, gas: 38.00, meterCharge: 20.00, electricity: 76.00, miscellaneous: 10.00 },
        previousDue: 0
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await UnitStatement.deleteMany({});
    await UnitStatement.insertMany(septemberStatements);

    console.log('Seeded ' + septemberStatements.length + ' unit statements');
    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error('Seed failed: ' + err.message);
    process.exit(1);
});
