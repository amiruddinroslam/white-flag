class GeolocationService {

    locateUser() {
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, maximumAge: 10000 })
        )
    }

    async getAddressFromLatLng({ lat, lng }) {
        // return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        //         .then(response => response.json())

        const geocoder = new window.google.maps.Geocoder()
        return geocoder.geocoder({ location: { lat, lng }})

    }

    checkHelpRequestAroundUser(userMarker, allMarkers) {
        let count = 0
        const center = new window.google.maps.LatLng(userMarker.lat, userMarker.lng)

        allMarkers.forEach((marker) => {
            let helpPosition = new window.google.maps.LatLng(marker.latLng.latitude, marker.latLng.longitude)

            // check radius of 10 km from current location
            let distanceBetween = window.google.maps.geometry.spherical.computeDistanceBetween(helpPosition, center) / 1000
            if (distanceBetween <= 10) {
                count++
            }
        })

        return count
    }
}

export default new GeolocationService()

