var express = require("express");
var app = express();

// serve the web page and its js/css from the public folder
app.use(express.static(__dirname + "/public"));
// let the server read a JSON request body  
app.use(express.json());  

// the calculation, kept separate from the routes
function add(a, b) {
  return a + b;
}

// GET web service, values come from the URL
// example: /api/add?num1=12&num2=4
app.get("/api/add", function (req, res) {
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "num1 and num2 must be numbers" });
  }

  res.json({ num1: num1, num2: num2, result: add(num1, num2) });
});

// POST web service, values come from the request body
app.post("/api/add", function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "num1 and num2 must be numbers" });
  }

  res.json({ num1: num1, num2: num2, result: add(num1, num2) });
});

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log("App listening to: " + port);
});
