var express = require("express")
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sample data for the five units in the building.
// In future,  this array gets replaced by a MongoDB collection.
const unitList = [
    {
        title: "Unit 1",
        image: "images/unit-1.jpg",
        tenant: "Daniel Reyes",
        status: "Paid",
        total: "1420.00",
        link: "View September statement",
        description: "Rent:  1150.00, Water bill:  62.00, Gas bill:  48.00, Water meter charge: 20.00, Electricity bill:  105.00, Others bill:  35.00."
    },
    {
        title: "Unit 2",
        image: "images/unit-2.jpg",
        tenant: "Mia Chen",
        status: "Due",
        total: "1385.50",
        link: "View September statement",
        description: "Rent:  1150.00, Water bill:  58.50, Gas bill:  44.00, Water meter charge: 20.00, Electricity bill:  98.00, Others bill:  15.00."
    },
    {
        title: "Unit 3",
        image: "images/unit-3.jpg",
        tenant: "Aaron Silva",
        status: "Paid",
        total: "1510.25",
        link: "View September statement",
        description: "Rent:  1250.00, Water bill:  64.25, Gas bill:  51.00, Water meter charge: 20.00, Electricity bill:  110.00, Others bill:  15.00."
    },
    {
        title: "Unit 4",
        image: "images/unit-4.jpg",
        tenant: "Priya Nair",
        status: "Due",
        total: "1290.00",
        link: "View September statement",
        description: "Rent:  1080.00, Water bill:  55.00, Gas bill:  40.00, Water meter charge: 20.00, Electricity bill:  85.00, Others bill:  10.00."
    },
    {
        title: "Unit 5",
        image: "images/unit-5.jpg",
        tenant: "Tom Becker",
        status: "Paid",
        total: "1175.75",
        link: "View September statement",
        description: "Rent:  980.00, Water bill:  51.75, Gas bill:  38.00, Water meter charge: 20.00, Electricity bill:  76.00, Others bill:  10.00."
    }
]

app.get('/api/units', (req, res) => {
    res.json({ statusCode: 200, data: unitList, message: "Success" })
})

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})
