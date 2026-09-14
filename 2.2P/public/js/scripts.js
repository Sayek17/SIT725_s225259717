// show the answer that came back from the server
function showResult(data) {
  var line = document.getElementById("result");
  if (data.error) {
    line.textContent = "Error: " + data.error;
  } else {
    line.textContent = data.num1 + " + " + data.num2 + " = " + data.result;
  }
}

// GET request, the numbers travel in the URL
function addWithGet() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;

  fetch("/api/add?num1=" + num1 + "&num2=" + num2)
    .then(function (response) { return response.json(); })
    .then(showResult);
}

// POST request, the numbers travel in a JSON body
function addWithPost() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;

  fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1: num1, num2: num2 })
  })
    .then(function (response) { return response.json(); })
    .then(showResult);
}

document.getElementById("getButton").addEventListener("click", addWithGet);
document.getElementById("postButton").addEventListener("click", addWithPost);
