clat = parseFloat(sessionStorage.getItem("lat"));
clon = parseFloat(sessionStorage.getItem("lon"));
var api = `https://api.openweathermap.org/data/2.5/weather?lat=${clat}&lon=${clon}&units=imperial&appid=c96f29f13d27cc104474585e1d6d90ec`;
var dailydata;
var data;
var tempdata;
var val;
var hourlydata;

async function fetchapi() {
  let res = await fetch(api);
  data = await res.json();
  // console.log(data);
  var location = document.getElementById("location");
  location.innerHTML = `${data.name} , ${data.sys.country}`;
  tempdata = document.getElementById("temp-data");
  val = data.main.temp;
  val = (((val - 32) * 5) / 9).toFixed(0);
  tempdata.innerText = val;
  document.getElementById("cel").style.fontWeight = "bold";

  var speed = (data.wind.speed * 3.6).toFixed(2);
  document.getElementById("wind").innerHTML = speed + " " + "km/hr";
  document.getElementById("humidity").innerHTML = `${data.main.humidity} %`;
  document.getElementById("cloud").innerHTML = `${data.clouds.all} %`;

  var image = document.getElementById("image");
  image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("temperature").classList.add("ksbs");

  var dailyimg = document.getElementById("dailyimg0");
  dailyimg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("min0").innerHTML =
    `${(((data.main.temp_min - 32) * 5) / 9).toFixed(0)}` + "°";
  document.getElementById("max0").innerHTML =
    `${(((data.main.temp_max - 32) * 5) / 9).toFixed(0)}` + "°";

  document.getElementById("weather").innerHTML = `${data.weather[0].main}`;
}

const fetchapi2 = async () => {
  let rsp = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${clat}&lon=${clon}&exclude=current,hourly,minutely&units=imperial&appid=c96f29f13d27cc104474585e1d6d90ec`
  );
  dailydata = await rsp.json();
  console.log(dailydata.daily);
  dailydata = dailydata.daily;
  // document.getElementById("dailyvalue").classList.add("dis_none");
  var days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  var day = new Date().getDay();
  document.getElementById("day0").innerHTML = days[day];

  for (let i = 1; i <= 7; i++) {
    var dta = dailydata[i];
    var day = new Date().getDay();
    var time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    // console.log(dta);
    document.getElementById("daytime").innerHTML =
      `${days[day]}` + " " + "," + " " + `${time}`;
    var dday = document.getElementById(`day${i}`);
    var cday = "";
    if (day + i <= 6) {
      cday = days[day + i];
    }
     else {
      cday = days[day + i - 6 - 1];
    }
    dday.innerText = cday;

    var image = document.getElementById(`dailyimg${i}`);
    image.src = `https://openweathermap.org/img/wn/${dta.weather[0].icon}@2x.png`;

    var mintemp = document.getElementById(`min${i}`);
    mintemp.innerHTML = `${(((dta.temp.min - 32) * 5) / 9).toFixed(0)}` + "°";

    var maxtemp = document.getElementById(`max${i}`);
    maxtemp.innerHTML = `${(((dta.temp.max - 32) * 5) / 9).toFixed(0)}` + "°";
  }

  document.getElementById("faren").onclick = () => {
    tempdata.innerText = `${data.main.temp.toFixed(0)}`;
    document.getElementById("cel").style.fontWeight = "normal";
    document.getElementById("faren").style.fontWeight = "bold";
    document.getElementById("min0").innerHTML =
      `${data.main.temp_min.toFixed(0)}` + "°";
    document.getElementById("max0").innerHTML =
      `${data.main.temp_max.toFixed(0)}` + "°";

    for (let i = 1; i <= 7; i++) {
      var dta = dailydata[i];
      var mintemp = document.getElementById(`min${i}`);
      mintemp.innerHTML = `${dta.temp.min.toFixed(0)}` + "°";

      var maxtemp = document.getElementById(`max${i}`);
      maxtemp.innerHTML = `${dta.temp.max.toFixed(0)}` + "°";
    }
  };

  document.getElementById("cel").onclick = () => {
    tempdata.innerText = val;
    document.getElementById("faren").style.fontWeight = "normal";
    document.getElementById("cel").style.fontWeight = "bold";
    document.getElementById("min0").innerHTML =
      `${(((data.main.temp_min - 32) * 5) / 9).toFixed(0)}` + "°";
    document.getElementById("max0").innerHTML =
      `${(((data.main.temp_max - 32) * 5) / 9).toFixed(0)}` + "°";

    for (let i = 1; i <= 7; i++) {
      var dta = dailydata[i];
      var mintemp = document.getElementById(`min${i}`);
      mintemp.innerHTML = `${(((dta.temp.min - 32) * 5) / 9).toFixed(0)}` + "°";

      var maxtemp = document.getElementById(`max${i}`);
      maxtemp.innerHTML = `${(((dta.temp.max - 32) * 5) / 9).toFixed(0)}` + "°";
      // console.log(data);
    }
  };
};

function gettime(timeString) {
  var H = +timeString.substr(0, 2);
  var h = H % 12 || 12;
  var ampm = H < 12 || H === 24 ? "am" : "pm";
  timeString = h + timeString.substr(2, 3) + ampm;

  return timeString;
}

const hourlyapi = async () => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${clat}&lon=${clon}&units=metric&appid=c96f29f13d27cc104474585e1d6d90ec`
  );
  hourlydata = await response.json();
  hourlydata = hourlydata.list;
  console.log(hourlydata);

  var data = [];
  var Header = ["Time", "Temperature", { role: "annotation" }];
  data.push(Header);

  for (let i = 0; i < 8; i++) {
    var hdata = hourlydata[i];
    var tempo = [];
    var time = gettime(hdata.dt_txt.substr(11));
    // console.log(time);
    tempo.push(time);
    tempo.push(parseInt(hdata.main.temp.toFixed(0)));
    tempo.push(parseInt(hdata.main.temp.toFixed(0)));
    data.push(tempo);
  }

  // Temperature chart

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var cdata = google.visualization.arrayToDataTable(data);

    var options = {
      chartArea: {
        left: 30,
        right: 30,
        top: 1,
      },
      hAxis: {
        titleTextStyle: { color: "#ffff00" },
        gridlines: {
          count: 0,
        },
      },
      vAxis: {
        minValue: 5,
        baselineColor: "#fff",
        textPosition: "none",
        gridlines: {
          count: 0,
        },
      },
      labels: "none",
      legend: "none",
      annotations: {
        alwaysOutside: true,
        stem: {
          length: 5,
          color: "white",
        },
        textStyle: {
          color: "#a9a9a9",
          bold: true,
          opacity: 1,
        },
        boxStyle: {},
      },
      colors: ["#e6c256"],
    };

    var chart = new google.visualization.AreaChart(
      document.getElementById("temp_div")
    );
    chart.draw(cdata, options);
  }
  
  // document.getElementById("temp_div").style.display = "block";
  // document.getElementById("humid_div").style.display = "none";
  // document.getElementById("wind_div").style.display = "none";
  
};

fetchapi();
fetchapi2();
hourlyapi();

function hourly() {
  var temperatur = document.getElementById("temperature");
  var humid = document.getElementById("humid");
  var windy = document.getElementById("windy");
  temperatur.classList.add("ksbs");
  humid.classList.remove("ksbs");
  windy.classList.remove("ksbs");
  document.getElementById("dailyvalue").style.display = "none";
  document.getElementById("hourlyvalue").style.display = "block";
  document.getElementById("temp_div").style.display = "block";
  document.getElementById("humid_div").style.display = "none";
  document.getElementById("wind_div").style.display = "none";
}
function daily() {
  var dailyval = document.getElementById("dailyvalue");
  var hourval = document.getElementById("hourlyvalue");
  document.getElementById("wind_div").style.display = "none";
  document.getElementById("temp_div").style.display = "none";
  document.getElementById("humid_div").style.display = "none";
  dailyval.style.display = "block";
  hourval.style.display = "none";
}

function temperature() {
  var temperatur = document.getElementById("temperature");
  var humid = document.getElementById("humid");
  var windy = document.getElementById("windy");
  temperatur.classList.add("ksbs");
  humid.classList.remove("ksbs");
  windy.classList.remove("ksbs");
  document.getElementById("humid_div").style.display = "none";
  document.getElementById("wind_div").style.display = "none";
  document.getElementById("temp_div").style.display = "block";
}

function humidity() {
  var humiddata = [];
  var Header = ["Time", "Humidity", { role: "annotation" }];
  humiddata.push(Header);

  for (let i = 0; i < 8; i++) {
    var hdata = hourlydata[i];
    var tempos = [];
    var time = gettime(hdata.dt_txt.substr(11));
    // console.log(time);
    tempos.push(time);
    tempos.push(parseInt(hdata.main.humidity));
    var s = `${hdata.main.humidity} %`;
    tempos.push(s);
    humiddata.push(tempos);
  }
  // Humidity chart
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var humidata = google.visualization.arrayToDataTable(humiddata);

    var options = {
      
      chartArea: {
        backgroundColor: {
          fill: "#ffffff",
          fillOpacity: 100,
        },
      },
      backgroundColor: "#ffffff",
      vAxis: {
        baselineColor: "#ffffff",
        textPosition: "none",
        gridlines: {
          count: 0,
        },
      },
      hAxis: {
        titleTextStyle: { color: "#ffffff" },
        gridlines: {
          count: 0,
        },
        baselineColor: "#ffffff",
      },
      isStacked: true,
      connectSteps: false,
      legend: "none",
    };

    var chart = new google.visualization.SteppedAreaChart(
      document.getElementById("humid_div")
    );

    chart.draw(humidata, options);
  }
  var temperatur = document.getElementById("temperature");
  var humid = document.getElementById("humid");
  var windy = document.getElementById("windy");
  humid.classList.add("ksbs");
  temperatur.classList.remove("ksbs");
  windy.classList.remove("ksbs");
  document.getElementById("temp_div").style.display = "none";
  document.getElementById("wind_div").style.display = "none";
  document.getElementById("humid_div").style.display = "block";
}

function wind() {

  var wdata = [];
  var Header = ["Time", "WindSpeed", { role: "annotation" }];
  wdata.push(Header);

  for (let i = 0; i < 8; i++) {
    var hdata = hourlydata[i];
    var wtemp = [];
    var time = gettime(hdata.dt_txt.substr(11));
    // console.log(time);
    wtemp.push(time);
    wtemp.push(parseInt((hdata.wind.speed * 3.6).toFixed(0)));
    var st = `${(hdata.wind.speed * 3.6).toFixed(0)} km/hr`;
    wtemp.push(st);
    wdata.push(wtemp);
  }
  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(wdata);

        var options = {
          vAxis: {
            baselineColor: "#ffffff",
            textPosition: "none",
            gridlines: {
              count: 0,
            },
          },
          hAxis: {
            gridlines: {
              count: 0,
            },
            baselineColor: "#ffffff",
          },
          annotations: {
            textStyle: {
              color: "black",
            },
            stem: {
              color: '#ffffff',
            }
          },
          curveType: 'function',
          legend: 'none'
        };

        var chart = new google.visualization.LineChart(document.getElementById('wind_div'));

        chart.draw(data, options);
      }
    
  var temperatur = document.getElementById("temperature");
  var humid = document.getElementById("humid");
  var windy = document.getElementById("windy");
  windy.classList.add("ksbs");
  humid.classList.remove("ksbs");
  temperatur.classList.remove("ksbs");
  document.getElementById("temp_div").style.display = "none";
  document.getElementById("humid_div").style.display = "none";
  document.getElementById("wind_div").style.display = "block";
}
