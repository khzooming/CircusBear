var map;

// add marker function
function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        // icon: ''
    });

    // check content
    if (props.content) {
        marker.addListener('click', function () {
            getIncidentInfo(props.content).then(function(data) {
                var infoWindow = new google.maps.InfoWindow({
                    content: data.incident.title + data.incident.description
                });
                infoWindow.open(map, marker);
            });
            
        });
    }
}

function initMap() {
    //map options
    var options = {
        zoom: 10,
        center: { lat: 34.0689, lng: -118.4452 }
    }
    // new map
    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow;
    // prompt user for location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location Found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        //  Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(BrowserHasGeoLocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(BrowserHasGeoLocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    // listen for click on map
    // google.maps.event.addListener(map, 'click',
    //     function (event) {
    //         // add marker
    //         addMarker({ coords: event.latLng });
    //     });

    // array of markers
    var markers = [
        {
            coords: { lat: 34.0622, lng: -118.4450 },
            content: '<h1>UCLA Extension</h1>'
        },
        {
            coords: { lat: 34.0780, lng: -118.4741 },
            content: '<h1>The Getty Center</h1>'
        },
        {
            coords: { lat: 34.0101, lng: -118.4961 },
            content: '<h1>Santa Monica Pier</h1>'
        }
    ];

    // loop through markers
    for (var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }
};

function getIncidentInfo(idProperty) {
    var url = `https://bikewise.org:443/api/v2/incidents/${idProperty}`;
    return new Promise(function(resolve, reject) {
        $.ajax({
            url,
            method: "GET"
        }).done(function (data) {
            resolve(data);
        }).fail(function (error) {
            reject(error);
        });
    });
}

function getIncidentLocation(type, city) {
    type = type.toLowerCase();
    city = city.toLowerCase();
    var url = `https://bikewise.org:443/api/v2/locations?incident_type=${type}&proximity=${city}&proximity_square=100`;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url,
            method: "GET"
        }).done(function (data) {
            resolve(data);
        }).fail(function (error) {
            reject(error);
        });
    });
}

function markIncidentLocation(data) {
    data.features.forEach(function(feature) {
        var marker = {
            coords: {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0]
            },
            content: feature.properties.id
        };

        addMarker(marker);
    })    
}

$(document).ready(function () {
    $("#idButton").on("click", function () {
      var type = $("#bikeIncidPull").val();
      var city = $("#cityEntr").val().trim();


      getIncidentLocation(type, city)
        .then(function (data) {
            markIncidentLocation(data);
        }).catch(function (error) {
            console.log("error" + error);
        });
    });
  });