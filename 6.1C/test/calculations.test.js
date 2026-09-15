// Unit tests for the calculation function. These call calculateUnitTotal()
// directly, so nothing here needs a server or a network request.
const expect = require('chai').expect;
const { calculateUnitTotal } = require('../utils/calculations');

describe('calculateUnitTotal()', function () {

    // Unit 4's September bills, the same figures the app serves.
    const unitFourBills = {
        rent: 1080.00,
        water: 55.00,
        gas: 40.00,
        meterCharge: 20.00,
        electricity: 85.00,
        miscellaneous: 10.00
    };

    // Valid behaviour: the six bill lines plus the amount carried forward.
    it('adds the six bills and the previous amount due', function () {
        expect(calculateUnitTotal(unitFourBills, 450.00)).to.equal(1335.00);
    });

    // Invalid behaviour: a bad value must not poison the whole total.
    it('counts a bill that is not a number as zero instead of returning NaN', function () {
        const bills = Object.assign({}, unitFourBills, { water: "abc" });
        const total = calculateUnitTotal(bills, 45.00);

        expect(total).to.not.be.NaN;
        expect(total).to.equal(1280.00);
    });

    // Edge case: a browser form sends its values as text, so the numbers
    // have to be added rather than joined end to end, and a cell the owner
    // left empty has to count as zero.
    it('adds bills that arrive as strings and counts a blank cell as zero', function () {
        const bills = {
            rent: "1080",
            water: "55",
            gas: "40",
            meterCharge: "20",
            electricity: "85",
            miscellaneous: ""
        };

        expect(calculateUnitTotal(bills, "45")).to.equal(1325.00);
    });

});
