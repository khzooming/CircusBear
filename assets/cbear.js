function initMap() {
    // map options
    var options = {
        zoom: 10,
        center: { lat: 34.0689, lng: -118.4452 }
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'), options);
    
    // listen for click on map
    google.maps.event.addListener(map, 'click',
    function(event){
        // add marker
        addMarker({coords:event.latLng});
    });
    

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
    for (var i = 0; i < markers.length; i++ ){
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