function initMap() {
    // map options
    var options = {
        zoom: 10,
        center: { lat: 34.0689, lng: -118.4452 }
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'), options);
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
        handleLocationError(false , infoWindow, map.getCenter());
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
    // function(event){
    //     // add marker
    //     addMarker({coords:event.latLng});
    // });


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

    // add marker function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            // icon: ''
        });

        // check content
        if (props.content) {
            // info window
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}