import React from 'react'
import Button from '@material-ui/core/Button'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import geolocationService from '../../services/geolocationService'
import './Geolocate.css'

export default function Geolocate({ panTo }) {

    const currentLocation = async () => {
        const position = await geolocationService.locateUser()
        panTo({
            lat: position?.coords.latitude,
            lng: position?.coords.longitude
        })
    }

    return (
        <>
            <Button className="geolocate-btn" variant="contained" color="default" onClick={currentLocation}>
                <MyLocationIcon />
            </Button>
        </>
    )
}
