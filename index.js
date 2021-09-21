
function success(data) {
  // extracting the latitude and longitude from the data
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  // alert("Your location: " + latitude + ", " + longitude);

  if (typeof(Storage) !== "undefined") {
    
    document.getElementsByClassName("loadtext").innerHTML = `<h3>Getting Location</h3>`;
    sessionStorage.setItem("lat",latitude);
    sessionStorage.setItem("lon",longitude);
  }
  else
    alert('Local storage is not supported on your device');
  
    console.log(sessionStorage.getItem("lat"));
    console.log(sessionStorage.getItem("lon"));
    window.location = './result.html';
}
function getLocation() {
  window.navigator.geolocation.getCurrentPosition(success, console.error);
}

