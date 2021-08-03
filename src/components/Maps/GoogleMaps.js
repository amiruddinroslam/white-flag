import React, { useRef, useCallback, useState, useEffect } from 'react'
import MAPS_SETTINGS from '../../constants/constant'
import mapStyles from '../../constants/mapStyles'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Search from './../Search/Search'
import { useSelector, useDispatch } from 'react-redux'
import geolocationService from './../../services/geolocationService'
import './GoogleMaps.css'
import LinearProgress from '@material-ui/core/LinearProgress'
import { fetchAllHelpRequest, fetchAllOfferRequest } from './../../redux/actions/productActions'
import InfoDialog from '../Common/InfoDialog'
import Geolocate from './../Geolocate/Geolocate'

const libraries = ['places']
const options = {
    styles: mapStyles,
    disableDefaultUI: true
}

export default function GoogleMaps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    })

    const [selectedPoint, setSelectedPoint] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [openInfoDialog, setOpenInfoDialog] = useState(false)

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

    useEffect(() => {
        setIsLoading(true)
        if (isLoaded) {
            const currentLocation = async () => {
                const position = await geolocationService.locateUser()
                panTo({
                    lat: position?.coords.latitude,
                    lng: position?.coords.longitude
                })
                setIsLoading(false)
            }
    
            currentLocation()
            dispatch(fetchAllHelpRequest())
            dispatch(fetchAllOfferRequest())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    // const formatTime = (unix) => Date(unix)

    if (loadError) { return `Error loading maps` }
    if (!isLoaded) { return `Loading maps...` }

    return (
        <>
            {isLoading && <LinearProgress />}
            <div className="autocomplete">
                <Search panTo={panTo} />
            </div>
            <div className="geolocate">
                <Geolocate panTo={panTo} />
            </div>
            <GoogleMap
                mapContainerStyle={MAPS_SETTINGS.CONTAINER_STYLE}
                zoom={MAPS_SETTINGS.DEFAULT_ZOOM}
                center={MAPS_SETTINGS.DEFAULT_CENTER}
                options={options}
                onLoad={onLoadMap}>
                {requestHelpMarkers && requestHelpMarkers.map(marker => (
                    <Marker 
                        key={marker.id} 
                        position={{ lat: marker.latLng.latitude, lng: marker.latLng.longitude }}
                        onClick={() => {
                            setSelectedPoint({ ...marker, type: 'Help' })
                            setOpenInfoDialog(true)
                        }}
                        icon={{
                            url: `/white-flag.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(30, 30),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}
                {offerHelpMarkers && offerHelpMarkers.map(marker => (
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
                            anchor: new window.google.maps.Point(30, 30),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}
                {selectedPoint ? (
                    <InfoDialog
                        open={openInfoDialog}
                        data={selectedPoint}
                        closeInfoDialog={() => setOpenInfoDialog(false)}
                    />
                ) : null}
            </GoogleMap>
        </>
    )
}
