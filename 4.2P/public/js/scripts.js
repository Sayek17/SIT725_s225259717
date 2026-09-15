// Ask the server for the unit list and draw the cards when it replies.
const getUnits = () => {
    $.get('/api/units', (response) => {
        if (response.statusCode == 200) {
            $('#loader').hide();
            addCards(response.data);
        }
    })
}

// Build one Materialize card for every unit in the list.
const addCards = (items) => {
    items.forEach(item => {
        let chipColour = "amber darken-2";
        if (item.status == "Paid") {
            chipColour = "green darken-1";
        }

        let itemToAppend = '<div class="col s12 m6 l4">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator unit-photo" src="' + item.image + '">' +
            '</div>' +
            '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title +
            '<i class="material-icons right">more_vert</i></span>' +
            '<p class="tenant-line">' + item.tenant + '</p>' +
            '<div class="chip white-text ' + chipColour + '">' + item.status + '</div>' +
            '<p class="unit-total">$' + item.total + '</p>' +
            '<p><a href="#">' + item.link + '</a></p>' +
            '</div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title +
            '<i class="material-icons right">close</i></span>' +
            '<ul class="card-details">' + item.description.split(', ').map(detail => '<li>' + detail.trim() + '</li>').join('') +
            '</ul>' +
            '<p class="card-text"><b>Total due: $' + item.total + '</b></p>' +
            '</div>' +
            '</div></div>';

        $("#card-section").append(itemToAppend)
    });
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
});
