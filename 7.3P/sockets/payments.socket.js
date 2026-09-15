// All Socket.IO connection and event handling for the live payment board,
// kept out of server.js the same way business logic is kept out of the
// routes in this project. One event comes in, two go out to everyone.

const unitsService = require('../services/units.service');
const { calculateUnitTotal, calculateOutstanding } = require('../utils/calculations');

// The total still owed across every unit marked Due, recalculated fresh
// each time rather than stored, the same rule 6.1C used for a unit total.
function currentOutstanding() {
    return calculateOutstanding(unitsService.getAllStatements()).toFixed(2);
}

module.exports = function registerPaymentSocket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // A tab opened after other tabs have already toggled some units
        // still needs the current outstanding figure, not just future
        // changes, so send it once as soon as the connection is made.
        socket.emit('statementUpdated', { outstanding: currentOutstanding() });

        // The one event the client ever sends: a unit's button was
        // clicked. The card itself does not decide its own next state,
        // the server does, so every tab ends up agreeing.
        socket.on('paymentReceived', (payload) => {
            const unitNumber = payload && payload.unitNumber;
            const statement = unitsService.getStatement(unitNumber);
            if (!statement) {
                return;
            }

            const newStatus = statement.paymentStatus === "Paid" ? "Due" : "Paid";
            unitsService.setPaymentStatus(unitNumber, newStatus);

            io.emit('statementUpdated', {
                unitNumber: statement.unitNumber,
                status: newStatus,
                outstanding: currentOutstanding(),
                updatedAt: statement.updatedAt
            });

            io.emit('activity', {
                message: 'Unit ' + statement.unitNumber + ' marked ' + newStatus +
                    ' at ' + new Date(statement.updatedAt).toLocaleTimeString(),
                at: statement.updatedAt
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
