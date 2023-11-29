document.getElementById('geolocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var location = 'Current location'; 
            document.getElementById('location').textContent = 'Location: ' + location;
            document.getElementById('coordinates').textContent = 'Latitude: ' + lat + ', Longitude: ' + lon;
            updateDashboard(lat, lon, new Date());
            updateDashboardTomorrow(lat, lon, new Date());
        }, function(error) {
            // Handle error if getCurrentPosition fails
            console.error("Error getting location: ", error);
            
        });
    } else {
        console.error("Geolocation is not supported by this browser or no location provided.");
       
    }
});



document.getElementById('searchBtn').addEventListener('click', function() {
    var location = document.getElementById('locationSearch').value;
    fetch('https://geocode.maps.co/search?q=' + location)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) { // Check if data array has elements
            var lat = data[0].lat;
            var lon = data[0].lon;
            document.getElementById('location').textContent = 'Location: ' + location;
            document.getElementById('coordinates').textContent = 'Latitude: '+lat+', Longitude: '+lon;
            updateDashboard(lat, lon, new Date());
            updateDashboardTomorrow(lat, lon, new Date());
        } else {
            console.log("Location not found");
        }
    })
    .catch(error => console.error(error));
});

function updateDashboard(lat, lon, date) {
    var dateStr = date.toISOString().split('T')[0];
    document.getElementById('dateToday').textContent = 'Date: ' + dateStr; 

    fetch('https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lon + '&date=' + dateStr)
    .then(response => response.json())
    .then(data => {
        var results = data.results;

        document.getElementById('sunriseToday').textContent = results.sunrise;
        document.getElementById('sunsetToday').textContent = results.sunset;
        document.getElementById('dawnToday').textContent = 'Dawn: ' + results.dawn;
        document.getElementById('duskToday').textContent = 'Dusk: ' + results.dusk;
        document.getElementById('dayLengthToday').textContent = 'Day Length: ' + results.day_length;
        document.getElementById('solarNoonToday').textContent = 'Solar Noon: ' + results.solar_noon;
        document.getElementById('timezone').textContent = 'Timezone: ' + results.timezone;

    })
    .catch(error => console.error(error));
}

function updateDashboardTomorrow(lat, lon, date) {
    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dateStr = tomorrow.toISOString().split('T')[0];
    document.getElementById('dateTomorrow').textContent = 'Date: ' + dateStr;  

    fetch('https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lon + '&date=' + dateStr)
    .then(response => response.json())
    .then(data => {
        var results = data.results;

        document.getElementById('sunriseTomorrow').textContent = results.sunrise;
        document.getElementById('sunsetTomorrow').textContent = results.sunset;
        document.getElementById('dawnTomorrow').textContent = 'Dawn: ' + results.dawn;
        document.getElementById('duskTomorrow').textContent = 'Dusk: ' + results.dusk;
        document.getElementById('dayLengthTomorrow').textContent = 'Day Length: ' + results.day_length;
        document.getElementById('solarNoonTomorrow').textContent = 'Solar Noon: ' + results.solar_noon;

    })
    .catch(error => console.error(error));
}






