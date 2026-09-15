const mongoose = require('mongoose');

// One document per unit per month. Money is stored as Decimal128 so
// cents cannot drift the way they can with plain floating point numbers.
const UnitStatementSchema = new mongoose.Schema({
    unitNumber: { type: Number, required: true },
    tenantName: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Due'], default: 'Due' },
    statementMonth: { type: String, required: true },
    imagePath: { type: String, required: true },
    bills: {
        rent: { type: mongoose.Schema.Types.Decimal128, default: 0 },
        water: { type: mongoose.Schema.Types.Decimal128, default: 0 },
        gas: { type: mongoose.Schema.Types.Decimal128, default: 0 },
        meterCharge: { type: mongoose.Schema.Types.Decimal128, default: 0 },
        electricity: { type: mongoose.Schema.Types.Decimal128, default: 0 },
        miscellaneous: { type: mongoose.Schema.Types.Decimal128, default: 0 }
    },
    previousDue: { type: mongoose.Schema.Types.Decimal128, default: 0 }
});

module.exports = mongoose.model('UnitStatement', UnitStatementSchema);
