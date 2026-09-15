// Ask the server for the unit list and draw the cards when it replies.
const getUnits = () => {
    $.get('/api/units', (response) => {
        if (response.statusCode == 200) {
            $('#loader').hide();
            response.data.forEach(appendCard);
        }
    })
}

// Green for Paid, amber for Due, the same pairing 3.2P and 4.2P used.
const chipColour = (status) => status == "Paid" ? "green darken-1" : "amber darken-2";

// The button always reads the action it will perform next, so it flips
// wording along with the chip.
const paymentButtonLabel = (status) => status == "Paid" ? "Mark as Due" : "Payment Received";

// Build one Materialize card for a unit, with its own Payment Received
// button. Runs once per unit on page load; after that a toggle repaints
// the existing card instead of rebuilding it.
const appendCard = (item) => {
    let itemToAppend = '<div class="col s12 m6 l4" id="unit-card-' + item.unitNumber + '">' +
        '<div class="card">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
        '<img class="activator unit-photo" src="' + item.image + '">' +
        '</div>' +
        '<div class="card-content">' +
        '<span class="card-title activator grey-text text-darken-4">' + item.title +
        '<i class="material-icons right">more_vert</i></span>' +
        '<p class="tenant-line">' + item.tenant + '</p>' +
        '<div class="chip white-text ' + chipColour(item.status) + '" id="status-chip-' + item.unitNumber + '">' + item.status + '</div>' +
        '<p class="unit-total">$' + item.total + '</p>' +
        '<a class="waves-effect waves-light btn-small indigo darken-1 payment-btn" ' +
        'id="payment-btn-' + item.unitNumber + '" data-unit="' + item.unitNumber + '">' +
        paymentButtonLabel(item.status) + '</a>' +
        '</div>' +
        '<div class="card-reveal">' +
        '<span class="card-title grey-text text-darken-4">' + item.title +
        '<i class="material-icons right">close</i></span>' +
        '<ul class="card-details">' + item.description.split(', ').map(detail => '<li>' + detail.trim() + '</li>').join('') +
        '</ul>' +
        '<p class="card-text"><b>Total due: $' + item.total + '</b></p>' +
        '</div>' +
        '</div></div>';

    $("#card-section").append(itemToAppend);
}

// Repaints one card's chip and button from a statementUpdated broadcast.
// The total itself never changes here, only the status, so only these
// two pieces need touching.
const applyStatementUpdate = (data) => {
    if (data.unitNumber == null) {
        return;
    }
    $('#status-chip-' + data.unitNumber)
        .attr('class', 'chip white-text ' + chipColour(data.status))
        .text(data.status);
    $('#payment-btn-' + data.unitNumber).text(paymentButtonLabel(data.status));
}

// Updates the one figure that moves on every toggle: how much of the
// building is still unpaid.
const applyOutstanding = (outstanding) => {
    if (outstanding == null) {
        return;
    }
    $('#outstandingTotal .outstanding-value').text('$' + outstanding);
}

// Adds one line to the live activity feed, newest on top, clearing the
// placeholder row the first time a real update arrives.
const addActivityLine = (message) => {
    $('#activity-feed .placeholder-row').remove();
    $('#activity-feed').prepend('<li class="collection-item">' + message + '</li>');
}

// Read the modal form, print it in the console and show a toast.
const submitForm = () => {
    let formData = {};
    formData.unit = $('#unit').val();
    formData.billType = $('#billType').val();
    formData.amount = $('#amount').val();
    formData.month = $('#month').val();

    console.log("Form Data Submitted: ", formData);

    M.toast({ html: formData.billType + ' saved for ' + formData.unit });
    $('.modal').modal('close');
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('select').formSelect();
    $('#formSubmit').click(() => {
        submitForm();
    })
    getUnits();

    // Connect to the server's socket as soon as the page is ready. There
    // is only ever one socket for this page, shared by every button.
    const socket = io();

    $('#card-section').on('click', '.payment-btn', function () {
        const unitNumber = Number($(this).data('unit'));
        socket.emit('paymentReceived', { unitNumber: unitNumber });
    });

    socket.on('statementUpdated', (data) => {
        applyStatementUpdate(data);
        applyOutstanding(data.outstanding);
    });

    socket.on('activity', (data) => {
        addActivityLine(data.message);
    });
});
