module.exports = {
    googleMaps: function (event) {
        const myLatLng = {
            lat: event.location.latitude,
            lng: event.location.longitude
        };

        const map = new google.maps.Map(document.getElementById("googleMap"), {
            zoom: 10,
            center: myLatLng
        });

        const marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Hello World!"
        });

        const infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);

        service.getDetails({
                placeId: event.location.place_id
            },
            function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    google.maps.event.addListener(marker, "click", function () {
                        infowindow.setContent(
                            "<div><strong>" +
                            place.name +
                            "</strong><br>" +
                            place.formatted_address +
                            "</div>"
                        );
                        infowindow.open(map, this);
                    });
                }
            }
        )
    }
}
