const MAP_SETTINGS = {
    DEFAULT_CENTER: {
        lat: 3.166480,
        lng: 101.748344
    },
    CONTAINER_STYLE: {
        width: '100vw',
        height: '100vh'
    },
    DEFAULT_ZOOM: 12,
    MARKER_SIZE: 35,
    PIXEL_OFFSET: {
        MARKER: {
            X: 0,
            Y: -35,
        },
    },
    DIRECTIONS_OPTIONS: { 
        suppressMarkers: true, 
        preserveViewport: true 
    },
    GOOGLE_MAP_URL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
}

export default MAP_SETTINGS