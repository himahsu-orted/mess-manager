function checkForWifi() {
  let wifi = document.getElementById("wifiButton");
  if (wifi.innerText == "Wifi Off") return 0;
  return 1;
}
function makeWifiOn() {
  let wifi = document.getElementById("wifiButton");
  if (wifi.innerText == "Wifi Off") {
    wifi.innerText = "Wifi On";
    document.getElementById("ledBox").style.backgroundColor = "red";
  } else if (wifi.innerText == "Wifi On") {
    wifi.innerText = "Wifi Off";
    document.getElementById("ledBox").style.backgroundColor = "grey";
  }
}
function pushData(element) {
  let idNumber = document.getElementById("idNumber").value;

  let meal = element.id;
  console.log(meal);
  var cost;
  if (meal == "Item1") cost = "10";
  else if (meal == "Item2") cost = "20";
  else if (meal == "Item3") cost = "30";
  else if (meal == "Item4") cost = "40";
  if (idNumber.length > 0 && checkForWifi() == 1) {
    let URL =
      "https://script.google.com/macros/s/AKfycbw5BX_WOyTdzBlKdTLbTxi8yHM6TIsnB-EzZo2z2Ij2FCzD8NGP/exec?";

    let parameter = "id=" + idNumber + "&balance=" + cost;
    URL = URL + parameter;
    console.log(URL);
    fetchStatus(URL);
  }
}

async function fetchStatus(URL) {
  return await fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("idNumber").value = "";
      if (data == 0) {
        blinker(1000);
      } else if (data == 1) {
        document.getElementById("ledBox").style.backgroundColor = "red";
      } else if (data == -1) {
        blinker(200);
      }
    });
}
function blinker(duration) {
  var time = 0;

  var first = setInterval(function () {
    document.getElementById("ledBox").style.backgroundColor = "grey";
  }, duration);

  var second = setInterval(function () {
    document.getElementById("ledBox").style.backgroundColor = "red";
    time++;
    if (time == 5) {
      window.clearInterval(first);
      window.clearInterval(second);
    }
  }, duration * 2);
}
