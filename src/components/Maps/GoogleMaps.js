import React, { useRef, useCallback, useState, useEffect } from 'react'
import MAPS_SETTINGS from '../../constants/constant'
import mapStyles from '../../constants/mapStyles'
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api'
import Search from './../Search/Search'
import { useSelector, useDispatch } from 'react-redux'
import GeolocationService from '../../services/GeolocationService'
import './GoogleMaps.css'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { fetchAllHelpRequest, fetchAllOfferRequest } from './../../redux/actions/productActions'
import InfoDialog from '../Common/InfoDialog'
import SimpleAlert from '../Common/SimpleAlert'
import CommonBackdrop from '../Common/CommonBackdrop'

const libraries = ['places', 'geometry']
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    gestureHandling: 'greedy'
}

export default function GoogleMaps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    })

    const [selectedPoint, setSelectedPoint] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [openInfoDialog, setOpenInfoDialog] = useState(false)
    const [currentLocation, setCurrentLocation] = useState({})
    const [nearbyHelpRequest, setNearbyHelpRequest] = useState(0)

    const dispatch = useDispatch()
    const requestHelpMarkers = useSelector((state) => state.requestHelp.requestHelp)
    const offerHelpMarkers = useSelector((state) => state.offerHelp.offerHelp)

    const mapRef = useRef()

    const onLoadMap = useCallback(map => {
        mapRef.current = map
    }, [])

    const panTo = useCallback(({ lat, lng } )=> {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
    }, [])

    const handleCloseInfoDialog = () => setOpenInfoDialog(false)

    useEffect(() => {
        setIsLoading(true)
        if (isLoaded) {
            const currentLocation = async () => {
                const position = await GeolocationService.locateUser()
                const latLng = {
                    lat: position?.coords.latitude,
                    lng: position?.coords.longitude
                }

                panTo(latLng)
                setCurrentLocation(latLng)
                setIsLoading(false)
            }

            currentLocation()
            dispatch(fetchAllHelpRequest())
            dispatch(fetchAllOfferRequest())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    // To calculate white flags nearby user's location
    useEffect(() => {
        if (requestHelpMarkers.length) {
            const counter = GeolocationService.checkHelpRequestAroundUser(currentLocation, requestHelpMarkers)
            setNearbyHelpRequest(counter)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLocation, requestHelpMarkers])

    // refresh markers each 5 minutes
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchAllHelpRequest())
            dispatch(fetchAllOfferRequest())
        }, 300000);
        return () => clearTimeout(timer)

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    // const formatTime = (unix) => Date(unix)

    // if (loadError) { return `Error loading maps` }
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    // if (!isLoaded) { return `Loading maps...` }
    if (!isLoaded) {
        return <CommonBackdrop isOpen />
    }

    return (
        <>
            {isLoading && <LinearProgress />}
            <Box display="flex" justifyContent="center" className="simple-alert">
                {nearbyHelpRequest ? <SimpleAlert id={new Date()} type="info" text={`There are ${nearbyHelpRequest} white flags have been raised within 10km of your current location. Select any white flag icon to help.`} /> : null }
            </Box>
            {/* <Grid container>
            <Grid item xs={12}>
                {nearbyHelpRequest ? <SimpleAlert id={new Date()} type="info" text={`There are ${nearbyHelpRequest} white flags have been raised within 10km of your current location. Select any white flag icon to help.`} /> : null }
            </Grid>
            </Grid> */}
            <Search panTo={panTo} />
            <GoogleMap
                mapContainerStyle={MAPS_SETTINGS.CONTAINER_STYLE}
                zoom={MAPS_SETTINGS.DEFAULT_ZOOM}
                center={MAPS_SETTINGS.DEFAULT_CENTER}
                options={options}
                onLoad={onLoadMap}>
                {Object.keys(currentLocation).length > 0 ?
                    <Marker position={{ lat: currentLocation.lat, lng: currentLocation.lng }} />
                : null}
                {requestHelpMarkers.length ? 
                    <MarkerClusterer>
                        {(clusterer) =>
                            requestHelpMarkers.map(marker => (
                                <Marker 
                                    key={marker.id} 
                                    position={{ lat: marker.latLng.latitude, lng: marker.latLng.longitude }}
                                    onClick={() => {
                                        setSelectedPoint({ ...marker, type: 'Request' })
                                        setOpenInfoDialog(true)
                                    }}
                                    icon={{
                                        url: `/white-flag.png`,
                                        origin: new window.google.maps.Point(0, 0),
                                        anchor: new window.google.maps.Point(5, 30),
                                        scaledSize: new window.google.maps.Size(30, 30),
                                    }}
                                    clusterer={clusterer}
                                />
                            ))}
                    </MarkerClusterer> 
                : null}
                {offerHelpMarkers.length ? 
                    <MarkerClusterer>
                        {(clusterer) =>
                            offerHelpMarkers.map(marker => (
                                <Marker 
                                    key={marker.id} 
                                    position={{ lat: marker.latLng.latitude, lng: marker.latLng.longitude }}
                                    onClick={() => {
                                        setSelectedPoint({ ...marker, type: 'Offer' })
                                        setOpenInfoDialog(true)
                                    }}
                                    icon={{
                                        url: `/gift.png`,
                                        origin: new window.google.maps.Point(0, 0),
                                        anchor: new window.google.maps.Point(15, 15),
                                        scaledSize: new window.google.maps.Size(30, 30),
                                    }}
                                    clusterer={clusterer}
                                />
                            ))}
                        </MarkerClusterer>
                 : null}
                {selectedPoint ? (
                    <InfoDialog
                        open={openInfoDialog}
                        data={selectedPoint}
                        closeInfoDialog={handleCloseInfoDialog}
                    />
                ) : null}
            </GoogleMap>
        </>
    )
}
