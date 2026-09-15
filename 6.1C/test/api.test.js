// Tests for the REST endpoints. Supertest loads the app from app.js and
// sends real requests to it in memory, so npm test needs nothing running.

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('Units API', function () {

    // Valid behaviour: the list endpoint answers with the whole building.
    it('GET /api/units returns 200 and all five unit statements', function (done) {
        request(app)
            .get('/api/units')
            .end(function (err, res) {
                if (err) return done(err);

                expect(res.statusCode).to.equal(200);
                expect(res.body.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Success");
                expect(res.body.data).to.be.an('array').with.lengthOf(5);
                expect(res.body.data[3].total).to.equal("1335.00");
                done();
            });
    });

    // Valid behaviour: the server adds a set of bills up on request.
    it('POST /api/total returns the calculated total for a set of bills', function (done) {
        request(app)
            .post('/api/total')
            .send({
                bills: { rent: 1080, water: 55, gas: 40, meterCharge: 20, electricity: 85, miscellaneous: 10 },
                previousDue: 45
            })
            .end(function (err, res) {
                if (err) return done(err);

                expect(res.statusCode).to.equal(200);
                expect(res.body.data.total).to.equal("1335.00");
                done();
            });
    });

    // Invalid behaviour: an empty request body is rejected, not calculated.
    it('POST /api/total replies 400 when no bills are sent', function (done) {
        request(app)
            .post('/api/total')
            .send({})
            .end(function (err, res) {
                if (err) return done(err);

                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal("Bills are required");
                done();
            });
    });

});
