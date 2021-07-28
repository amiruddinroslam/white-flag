const geolocationService = {
    locateUser: () => {
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
    }
}

export default geolocationService

