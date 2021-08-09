import React, { useState } from 'react'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import GeolocationService from '../../services/GeolocationService'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import './Geolocate.css'

const useStyles = makeStyles((theme) => ({
    iconButton: {
      padding: 10,
    },
  }));

export default function Geolocate({ panTo }) {
    const classes = useStyles()
    const [isLoadingGeolocate, setIsLoadingGeolocate] = useState(false)

    const currentLocation = async () => {
        setIsLoadingGeolocate(true)
        const position = await GeolocationService.locateUser()
        panTo({
            lat: position?.coords.latitude,
            lng: position?.coords.longitude
        })
        setIsLoadingGeolocate(false)
    }

    return (
        <>
            {/* <Button className="geolocate-btn" variant="contained" color="default" onClick={currentLocation}>
                <MyLocationIcon />
            </Button> */}
            {isLoadingGeolocate ? <CircularProgress size="30px" /> : <IconButton color="primary" disabled={isLoadingGeolocate} className={classes.iconButton} aria-label="directions" onClick={currentLocation}>
                <MyLocationIcon />
            </IconButton>}
        </>
    )
}
